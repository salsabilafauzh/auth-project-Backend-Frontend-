import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(403);
        const user = await users.findAll({
            where: {
                refresh_token: refreshToken,
            },
        });
        if (!user[0]) return res.sendStatus(403); //forbidden status
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                const userId = user[0].id;
                const userName = user[0].name;
                const userEmail = user[0].email;
                const accessToken = jwt.sign(
                    { userId, userName, userEmail },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "20s",
                    }
                );
                res.json({ accessToken });
            }
        );
    } catch (error) {
        console.log(error);
    }
};
