import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./UserNavBar";
import "./static/gallery.css";

const Gallery = () => {
  const images = [
    "https://cdn.discordapp.com/attachments/935413965046050836/1144813789259243530/270177.jpeg",
    "https://cdn.discordapp.com/attachments/935413965046050836/1144813789531881623/27017722.jpg",
    "https://cdn.discordapp.com/attachments/935413965046050836/1144813789749981355/27017722_copy.jpg",
    "https://cdn.discordapp.com/attachments/935413965046050836/1144813790223941783/27017722_copy_3.jpg",
    "https://cdn.discordapp.com/attachments/935413965046050836/1144813790509150309/27017722_copy_5.jpg",
    "https://cdn.discordapp.com/attachments/935413965046050836/1144797375718772766/270177.jpeg",
  ];

  const imageDescriptions = [
    "Ryan Lamb - Candidate for Vice Captain and/or Creative Arts Prefect",
    "Luca Parsanajad - Candidate for School Captain and/or Creative Arts Prefect",
    "Ansh Rawat - Candidate for Social Media Prefect and/or Vice Captain",
    "Barsam banaiibajouri - Candidate for School Captain and/or Transport Prefect",
    "Lynden Weisenhan - Candidate for Creative Arts prefect and/or Social Media prefect.",
    "Dihein Kalatunga - Candidate for Vice Captain and/or School Captain.",
  ];

  return (
    <>
      <Navbar />
      <div className="box">
        <Carousel useKeyboardArrows={true}>
          {images.map((URL, index) => (
            <>
              <p className="image-description">{imageDescriptions[index]}</p>
              <div className="slide" key={index}>
                <img alt="SRC candidiate images" src={URL} />
              </div>
            </>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Gallery;
