import React, { useState } from 'react';
import './AktualityMain.css';

const OneAktualita = ({ date, headline, image, text, category, lineup }) => {
  const [imageError, setImageError] = useState(false);

  // Adjust default image path relative to the public folder
  const defaultImage = '/uploads/default.webp';
  const imageUrl = (!image || imageError) ? defaultImage : `http://localhost:5000${image}`;

  const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                            category === 'ZÁPAS' ? 'cat-zapas' : '';

  const handleImageError = () => {
    setImageError(true);  // Triggers fallback to the default image
    console.log('Image failed to load, falling back to default');
  };

  return (
    <div className="aktualita-container">
      <div className='category-akt'>
        <p className={`category-text ${categoryTextClass}`}>{category}</p>
        <p className='category-date'>{date}</p>
      </div>
      <img 
        src={imageUrl}
        alt={headline} 
        className="aktualita-image"
        onError={handleImageError} // Fallback to default on error
      />
      <div className="aktualita-insider">
        <div className="headline-headerr">
          <h2 className='headline-akt'>{headline}</h2>
        </div>
        <div className='aktualita-filling'>
          {lineup && (
            <div className='lineup-container'>
              <p className='lineup-label'>Sestava:</p>
              <p className='lineup-text'>{lineup}</p>
            </div>
          )}
          <p className="text-akt">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default OneAktualita;
