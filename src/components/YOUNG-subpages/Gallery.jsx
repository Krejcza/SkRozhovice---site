import React, { useState } from 'react';
import './Gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Komponenta galerie na detailních stránkách týmů mladší. 

const Gallery = ({ images = [] }) => {  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Podmínka, že pokud to nenajde žádný obrázek tak se vrácí text.

  if (images.length === 0) {
    return <div>Není k dispozici žádný obrázek.</div>;
  }

  // Tlačítko na přehrání dpředchozího obrázku s ternárním operátorem na vrácení když dojdu na konec obrázků, aby to rotovalo.

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Tlačítko na přehrání dalšího obrázku s ternárním operátorem na vrácení když dojdu na konec obrázků, aby to rotovalo.

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
