import React from "react";
import "./static/gallery.css"; // Import your CSS file
import { useState } from "react";
import { useEffect } from "react";

const Gallery = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let newSlideIndex = n;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      newSlideIndex = 1;
    } else if (n < 1) {
      newSlideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[newSlideIndex - 1].style.display = "block";
    dots[newSlideIndex - 1].className += " active";

    setSlideIndex(newSlideIndex);
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, []);
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
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src="d.jpeg" alt="Nature" style={{ width: "100%" }} />
          <div className="text">Caption Text</div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src="d.jpeg" alt="Snow" style={{ width: "100%" }} />
          <div className="text">Caption Two</div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src="d.jpeg" alt="Mds" style={{ width: "100%" }} />
          <div className="text">Caption Three</div>
        </div>
        <a className="prev" onClick={() => plusSlides(-1)}>
          ❮
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          ❯
        </a>
        <br />
        <div style={{ textAlign: "center" }}>
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
