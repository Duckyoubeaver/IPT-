import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styles from "./static/signup.css";
import { initializeApp } from "firebase/app";
import { auth, db } from "../../firebase.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // New state for the selected year
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const yearOptions = ["7", "8", "9", "10", "11", "12"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(email, password);
      navigate("/signin");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.signup_container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.signin_input_group}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.signin_input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.signin_input}
          />
        </div>
        <button
          type="submit"
          disabled={!email || !password}
          className={styles.signin_button}
        >
          Sign Up
        </button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
