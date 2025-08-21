import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/postlist">Posts</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/postdeatils">Post Details</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
