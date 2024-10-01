import express from "express";
import * as authController from "../controllers/authController.js"
const router = express.Router();

// REGISTER
router.post("/register", authController.registerController);

// LOGIN
router.post("/login" , authController.loginControlller);

// LOGOUT
router.post("/logout" , authController.logoutController);

// REFETCH
router.post("/refetch" , authController.refetchController);

export default router;