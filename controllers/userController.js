import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const getUsers = async (req, res) => {
    try {
        const user = await users.findAll({
            attributes: ["id", "name", "email"],
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
};

export const Register = async (req, res) => {
    const { name, email, password, comPassword } = req.body;
    if (password !== comPassword) {
        return res.status(400).json({
            message: "password dan confirm password tidak sama.",
        });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await users.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        res.json({
            message: "Registrasi anda berhasil.",
        });
    } catch (error) {
        console.log(error);
    }
};

export const Login = async (req, res) => {
    try {
        const cekUser = await users.findAll({
            where: {
                email: req.body.email,
            },
        });

        const match = await bcrypt.compare(
            req.body.password,
            cekUser[0].password
        );

        if (!match) {
            return res.status(400).json({
                message: "Password yang anda masukkan salah.",
            });
        }

        const userId = cekUser[0].id;
        const userName = cekUser[0].name;
        const userEmail = cekUser[0].email;
        const accessToken = jwt.sign(
            { userId, userName, userEmail },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "20s",
            }
        );
        const refreshToken = jwt.sign(
            { userId, userName, userEmail },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        await users.update(
            { refresh_token: refreshToken },
            {
                where: {
                    id: userId,
                },
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({
            message: "Email anda tidak ditemukan.",
        });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(403);
    const userId = user[0].id;
    await users.update(
        { refresh_token: null },
        {
            where: {
                id: userId,
            },
        }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};
