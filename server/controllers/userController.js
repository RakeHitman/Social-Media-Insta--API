import { customError } from "../../middlewares/error.js";
import User from "../models/User.js";

export const getUserController = async (req, res , next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new customError("User not found", 400);
        }
        const { password, ...data } = user._doc;
        res.status(200)
            .json(data)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const updateUserController = async (req , res , next) => {
    const {userId} = req.params;
    const updateData = req.body;
    try {
        const userToUpdate = await User.findById(userId);
        if(!userToUpdate) {
            throw new customError("User was not found" , 404)
        }
        Object.assign(userToUpdate , updateData);
        await userToUpdate.save();
        res.status(200)
        .json({message : "User was updated successfully !" , user :userToUpdate});
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const followUserController = async (req ,res , next) => {
    const {userId} = req.params;
    const {_id} = req.body;
    try {
        if(userId===_id) {
            throw new customError("You cannot follow yourself ." ,404);
        }

        const userToFollow = await User.findById(userId);
        const loggedInUser = await User.findById(_id);
        
        if(!userToFollow || !loggedInUser) {
            throw new customError("User not found." , 400);
        }

        if(loggedInUser.following.includes(userToFollow)) {
            throw new customError("Already following the User . " , 404);
        }
        loggedInUser.following.push(userId);
        userToFollow.followers.push(_id);
        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).json({message:"Successfully followed the user"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}
