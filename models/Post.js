// this will store the schema (structure) for your blog posts.

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
