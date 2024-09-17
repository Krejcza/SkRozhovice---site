import React, { useState } from 'react';
import './Gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Gallery = ({ images = [] }) => {  // Přidej výchozí prázdné pole
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return <div>Není k dispozici žádný obrázek.</div>;
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="gallery-container">
      <button className="gallery-nav gallery-nav-left" onClick={prevImage}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="gallery-image" />
      <button className="gallery-nav gallery-nav-right" onClick={nextImage}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div className="gallery-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
