import React from "react";
import video from "./src_trailer_1.mov";

const About = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <ul className="left">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/gallery">GALLERY</a>
          </li>
        </ul>
        <ul className="nav-links">
          <li>
            <a href="/vote" className="nav-button">
              VOTE
            </a>
          </li>
          <li>
            <a href="/signin" className="nav-button">
              LOGIN
            </a>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <section className="about-section">
          <div className="about-content">
            <h1>About the SRC Elections</h1>

            <p>
              Our Student Representative Council (SRC) is dedicated to
              representing the voices and concerns of the student body. We work
              closely with students, teachers, and administrators to create a
              positive and inclusive school environment.
            </p>
            <p>
              Join us in building a better tomorrow for our school community!
            </p>
          </div>
        </section>
        <video src={video} width="800" height="400" controls />
      </main>
    </div>
  );
};

export default About;
