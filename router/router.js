import express from "express";
import {
    getUsers,
    Register,
    Login,
    Logout,
} from "../controllers/userController.js";
import { verifyTokenUser } from "../middleware/verifyTokenUser.js";
import { refreshToken } from "../controllers/refreshToken.js";
const router = express.Router();

router.get("/getUser", verifyTokenUser, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/getToken", refreshToken);
router.delete("/logout", Logout);

export default router;
