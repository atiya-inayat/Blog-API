import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to=".postlist">Posts</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/postdeatils"></Link>
    </nav>
  );
};

export default Navbar;
