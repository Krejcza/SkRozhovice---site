import React, { useState } from 'react';
import './FullGallery.css';

// Galerie obrázků s možným rozkliknutím na stránce o klubu. Používá a mapuje poslané obrázky z FImages.jsx

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);


  // přidává classu noscrool, aby se při koukání na obrázek nedalo scrollovat

  const openImage = (image) => {
    setSelectedImage(image);
    // Prevent scrolling by adding a class to the body
    document.body.classList.add('no-scroller');
    // Store the current scroll position
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`; // Lock the scroll position
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('no-scroller');
    document.body.style.top = '';
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className="gallery-item"
            onClick={() => openImage(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modalGal" onClick={closeModal}>
          <div className="modal-contentGal">
            <span className="closeGal" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
