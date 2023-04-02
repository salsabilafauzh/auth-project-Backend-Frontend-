import express from "express";
import dotenv from "dotenv";
import db from "./config/configDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);

const PORT = 3000 || process.env.PORT;

try {
    await db.authenticate();
    console.log("Database connected....");
    // await users.sync();
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
