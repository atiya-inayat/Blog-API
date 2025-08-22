import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";

const PostDetails = () => {
  const { id } = useParams(); // get post id from url
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="loader"></p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <small>Created at: {new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
};

export default PostDetails;
