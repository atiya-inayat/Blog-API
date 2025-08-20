import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  // new post
  try {
    const { title, description } = req.body; // This means: “Take title and description from the data the user sent to us.”
    const newPost = await Post.create({
      title,
      description,
      user: req.user,
      _id,
    }); // Create a new Post object using the extracted data.
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
    const post = await Post.findById(req.params.id); // req.params.id → The id from the URL.
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    // check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description } = req.body;
    // title → the new value coming from the client (req.body).
    // post.title → the old value already stored in the database.
    post.title = title || post.title;
    post.description = description || post.description;
    const UpdatedPost = await post.save();

    res.json(UpdatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  // router.delete → Runs when a DELETE request is sent to this route.
  try {
    const post = await Post.findById(req.params.id); // req.params.id → The id from the URL.
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
