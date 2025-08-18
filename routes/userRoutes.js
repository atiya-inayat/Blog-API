import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/test", registerUser); // POST /api/users/test

export default router;
