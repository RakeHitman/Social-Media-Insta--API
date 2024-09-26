import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const {username , email , password} = req.body;
        const existingUser = await User.findOne({$or : [{username} , {email}]})
        if(existingUser) {
            res.status(500).json("The user already exist with the username and email !")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  bcrypt.hashSync(password , salt);
        const newUser = new User({...req.body , password : hashedPassword});
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;