import React from "react";
import Navbar from "./UserNavBar"
import "./static/home.css";
import { ToastContainer, toast } from 'react-toastify';
import { UserAuth } from "../../context/AuthContext";
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate()

  const voteFunction = () => {
    if (user === null) {

        toast.error("You must be signed in to vote!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
    }
    else {
      navigate("/vote")
    }
  }
  return (
    <div className="home">
      <ToastContainer/>
      <Navbar/>
      <div className="parallax"></div>
      <main className="main-content">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Building Leaders, Building Tomorrow</h1>
              <p className="slogan">
                Empower your voice in student council elections.
              </p>
              <button className="cta-button" onClick={voteFunction} >Vote Now</button>
            </div>
          </div>
        </section>
        {/* New Section: What is the SRC? */}

        <section className="info-section scroll-lock-section">
          <div className="info-content">
            <h2>What is the SRC?</h2>
            <p className="info-description ">
              The Student Representative Council (SRC) is a crucial platform for
              students to voice their opinions, collaborate on initiatives, and
              actively contribute to the school community. It serves as a bridge
              between students and school administration, ensuring your concerns
              are heard and addressed.
            </p>
            <button className="cta-button">
              <a href="/about">About</a>
            </button>
          </div>
        </section>
        {/* New Section: Meet Our Student Leaders */}
        <section className="leaders-section scroll-lock-section">
          <div className="leaders-content">
            <h2>Meet Our Student Leaders</h2>
            <p className="leaders-description">
              Get acquainted with the inspiring individuals who have taken on
              leadership roles within the student council. They are dedicated to
              representing your interests, bringing positive change, and
              enhancing the overall student experience. Learn about their
              visions and goals for the school community.
            </p>
            <button className="cta-button">
              <a href="/gallery">Gallery</a>
            </button>
          </div>
        </section>
        {/* New Section: How Can I Vote? */}
        <section className="vote-section scroll-lock-section">
          <div className="vote-content">
            <h2>How Can I Vote?</h2>
            <p className="vote-description">
              Voting is your opportunity to directly influence the decisions
              that impact your school life. Before the elections, you'll receive
              detailed instructions on how to access the voting platform. Cast
              your vote securely and play a role in shaping the future of your
              student body.
            </p>
            <button onClick={voteFunction} className="cta-button" >
            Vote Now
          </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
