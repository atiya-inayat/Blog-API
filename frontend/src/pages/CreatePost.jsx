import React, { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, description });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create Post");
    }
  };

  return (
    <div>
      <h2>Create Post </h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
