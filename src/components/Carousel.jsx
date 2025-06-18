import React, { useState, useEffect, useRef } from 'react';
const DELAY = 2000;

function Carousel() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  async function fetchImages() {
    const response = await fetch('https://dummyjson.com/products?limit=5');
    const data = await response.json();
    setImages(data.products);
  }

  function handleNext() {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }
  function handlePrevious() {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const timeoutRef = setTimeout(() => handleNext(), DELAY);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [images, index]);

  return (
    <div className="carousel-container">
      <button onClick={handlePrevious}>Prev</button>
      {images.map((image, idx) => {
        return (
          <div style={{ display: idx === index ? '' : 'none' }}>
            <img src={image.thumbnail} alt={image.title} />
          </div>
        );
      })}
      <button onClick={handleNext}> Next</button>
    </div>
  );
}

export default Carousel;
