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

