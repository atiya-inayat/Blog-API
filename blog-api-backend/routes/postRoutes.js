import express from "express";

import {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { validatePost, validate } from "../validators/postValidators.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);
// Get single post by ID
router.get("/:id", getPostsById);

// Create a new post
router.post("/", protect, validatePost, validate, createPost);
// Update post
router.put("/:id", protect, validatePost, validate, updatePost);
// Delete post
router.delete("/:id", protect, deletePost);

export default router;
