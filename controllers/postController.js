import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  // new post
  try {
    const { title, description } = req.body; // This means: “Take title and description from the data the user sent to us.”
    const newPost = await Post.create({ title, description }); // Create a new Post object using the extracted data.
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  // find all posts
  try {
    // reminder
    const posts = await Post.find(); // Post.find() → Get all posts from the database.
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostsById = async (req, res, next) => {
  // Find a specific post by id
  try {
    const post = await Post.findById(req.params.id); // req.params.id → The id from the URL.
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  // Update or modifiy post
  try {
    const { title, description } = req.body;
    const UpdatedPost = await Post.findByIdAndUpdate(
      // Whatever the database returns after updating will be stored inside this variable. it will have two parameters: first one will be the id of post which we wanna update , second will be the object(inside it , it will have things we want to update, like title , desc), third one is optional without it it will display old post with it it will replace old with new one
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!UpdatedPost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(UpdatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  // router.delete → Runs when a DELETE request is sent to this route.
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); // Finds the post by ID and deletes it.
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.json(deletedPost);
  } catch (err) {
    next(err);
  }
};
