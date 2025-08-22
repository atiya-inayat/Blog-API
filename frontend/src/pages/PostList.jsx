import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get("/posts");
        setPosts(data);
        console.log(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch posts");
      } finally {
        setloading(false);
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete post");
    }
  };

  if (loading) {
    return <p className="loader"></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No Post Available</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link to={`/postdetails/${post._id}`}>
                {" "}
                {post.title} &nbsp; <small> created at </small> &nbsp;{" "}
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </Link>
              ;<button onClick={() => handleDelete(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostList;
