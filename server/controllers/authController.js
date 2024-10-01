import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError } from "../../middlewares/error.js";

export const registerController = async (req, res , next) => {
    try {
        const {username , email , password} = req.body;
        const existingUser = await User.findOne({$or : [{username} , {email}]})
        if(existingUser) {
            throw new customError("Username or email alrady exists" , 400);
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
}

export const loginControlller = async (req , res) => {
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
}

export const logoutController = async (req , res) => {
    try {
        res.clearCookie("token" , {sameSite:"none" , secure:true})
        .status(200)
        .json("User logged out successfully !");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const refetchController = async (req , res) => {
    const token = req.cookies.token;
    jwt.verify(token , process.env.JWT_SECRET , {} , async (err , data) => {
        console.log(data)
        if (err) {
            res.status(404).json(err);
        }
        try {
            const id = data._id
            const user = User.findOne({id:id});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    })
}

