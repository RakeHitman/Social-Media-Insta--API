import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        console.log(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// LOGIN
router.post("/login" , async (req , res) => {
    try {
        let user;
        if ( req.body.email ) {
            user = await User.findOne({email : req.body.email});
        } else if ( req.body.username ) {
            user = await User.findOne({username : req.body.username});
        } else if (!user) {
            res.status(404).json("User not found")
        }

        const match = await bcrypt.compare(req.body.password , user.password);
        if(!match) {
            res.status(401).json("Wrong Credentials !")
        }

        res.status(200).json(user)
        console.log("A user just logged in !")
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;