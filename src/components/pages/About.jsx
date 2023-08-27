import React from "react";
import video from "./src_trailer_1.mov";
import Navbar from "./UserNavBar";

const About = () => {
  return (
    <div className="home">
      <Navbar />
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
