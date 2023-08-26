import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./static/signup.css";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  function wait(milliseconds) {
    // To allow the user to properly view the success alert message.
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@education.nsw.gov.au")) {
      // Display an error message or prevent submission
      toast.error('Invalid Education Email', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log("Invalid email domain - Email should be within the NSW school domain");
      return;
    }
    try {

      await createUser(email, password); 
      await wait(3000);
      navigate("/signin");

      
    } catch (e) {
      toast.error(e.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(e.message);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-input-group">
        <label>Email Address:</label>
          <input
            type="email"
            placeholder="Enter your education email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter your preferred first name"

            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-input"
          />
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter your surname"
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-input"
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className="signup-button"
        >
          Sign Up
        </button>
      </form>
      <p className="direct-link">
        Already have an account? <Link to="/signin">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
