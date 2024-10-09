import express from "express";
import dotenv from "dotenv";
import connectdb from "./server/config/db.js";
import authRoute from "./server/routes/auth.js"
import userRoute from "./server/routes/user.js"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`Server running on PORT : ${port}`)
    connectdb();
});