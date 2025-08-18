import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser); // POST /api/users/test
router.post("/login", loginUser); // POST /api/users/test

export default router;
