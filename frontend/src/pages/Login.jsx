import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const Login = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Regestered..");
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/users/register", form);
      // data should include: _id, name, email, token
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/postlist"); // go to posts after signup
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login-main-container">
        <form onSubmit={handleSubmit}>
          <div className="login-email-div">
            <label htmlFor="">Email</label>
            <input type="email" onChange={onChange} />
          </div>

          <div className="login-pass-div">
            <label>Password</label>
            <input type="password" onChange={onChange} />
          </div>

          <button className="register-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
