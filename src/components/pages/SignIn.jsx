import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./static/signin.css"; // Import your CSS file for styling

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-subtitle">
        <h1>Sign in to your account</h1>
      </div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="signin-input-group">
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="signin-input"
            type="email"
          />
        </div>
        <div className="signin-input-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
            type="password"
          />
        </div>
        <button className="signin-button">SIGN IN</button>
      </form>
    </div>
  );
};

export default Signin;
