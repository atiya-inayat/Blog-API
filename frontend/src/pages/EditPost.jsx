import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        setError("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, description });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update Post");
    }
  };

  return (
    <div>
      <h2>Edit Post </h2>
      {/* if error so show error msg */}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
