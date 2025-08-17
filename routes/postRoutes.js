import express from "express";

import {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { validatePost } from "../validators/postValidators.js";

const router = express.Router();

// Create a new post
router.post("/", validatePost, createPost);

// Get all posts
router.get("/", getPosts);

// Get single post by ID
router.get("/:id", getPostsById);

// Update post
router.put("/:id", validatePost, updatePost);

// Delete post
router.delete("/:id", deletePost);

export default router;
