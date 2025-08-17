import express from "express";
import Post from "../models/Post.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Create a new post
router.post(
  "/",
  [
    check("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 character long"),
    check("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // new post
    try {
      const { title, description } = req.body; // This means: “Take title and description from the data the user sent to us.”
      const newPost = new Post({ title, description }); // Create a new Post object using the extracted data.
      const savedPost = await newPost.save(); // Store that Post into the database permanently.
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json({ message: "Error Creating POst", error: err });
    }
  }
);

// Get all posts
router.get("/", async (req, res) => {
  // find all posts
  try {
    const posts = await Post.find(); // Post.find() → Get all posts from the database.
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error Fetching  Posts", error: err });
  }
});

// Get single post by ID
router.get("/:id", async (req, res) => {
  // Find a specific post by id
  try {
    const post = await Post.findById(req.params.id); // req.params.id → The id from the URL.
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Fetching Single  Post", error: err });
  }
});

// Update post
router.put(
  "/:id",

  [
    check("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 character long"),
    check("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Update or modifiy post
    try {
      const { title, description } = req.body;
      const UpdatedPost = await Post.findByIdAndUpdate(
        // Whatever the database returns after updating will be stored inside this variable. it will have two parameters: first one will be the id of post which we wanna update , second will be the object(inside it , it will have things we want to update, like title , desc), third one is optional without it it will display old post with it it will replace old with new one
        req.params.id,
        { title, description },
        { new: true }
      );
      if (!UpdatedPost) {
        return res.status(404).json({ message: "Post not Found" });
      }
      res.json(UpdatedPost);
    } catch (err) {
      res.status(500).json({ message: "Error Updating Post", error: err });
    }
  }
);

// Delete post
router.delete("/:id", async (req, res) => {
  // router.delete → Runs when a DELETE request is sent to this route.
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); // Finds the post by ID and deletes it.
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ message: "Error Deleting Post", error: err });
  }
});

export default router;
