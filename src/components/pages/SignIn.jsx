import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase";
import "./static/signin.css"; // Import your CSS file for styling

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      const user = auth.currentUser;
      if (user && user.emailVerified) {
        navigate("/home"); // Navigate only if the user is verified
      } else {
        
        toast.error(`User is not verified! Check the email, ${email}, for verification link.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        // You can display an error message or handle the unverified user case.
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="signin-container">
      <ToastContainer />
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
        <p className ="direct-link">
        Don't have an account? <Link to="/signup">Register now!</Link>
      </p>
      </form>
    </div>
  );
};

export default Signin;
