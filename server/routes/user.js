import express from "express";
import * as userController  from "../controllers/userController.js";

const router = express.Router();

// GET USER
router.get("/:userId" , userController.getUserController);

// UPDATE THE USER
router.put("/update/:userId" , userController.updateUserController);

// FOLLOW USER
router.post("/follow/userId" , userController.followUserController);

export default router;
