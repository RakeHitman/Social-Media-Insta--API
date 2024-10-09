import express from "express";
import { getUserController } from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId" , getUserController);

export default router;
