import React, { useState } from 'react';
import './FullGallery.css';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.classList.add('no-scroll');
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('no-scroll');
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
