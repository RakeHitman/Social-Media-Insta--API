import express from "express";
import dotenv from "dotenv";
import connectdb from "./server/config/db.js";
import authRoute from "./server/routes/auth.js"
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(port, (req, res) => {
    console.log(`Server running on PORT : ${port}`)
    connectdb();
});