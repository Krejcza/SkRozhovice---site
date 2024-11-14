import React, { useState } from 'react';
import './AktualityMain.css';

const OneAktualita = ({ date, headline, image, text, category, lineup, onImageClick, expanded }) => {
  const [imageError, setImageError] = useState(false);

  const defaultImage = 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1731591618/SkRozhovice/ooo6wxdqeuzyybxxcgbx.webp';
  const imageUrl = imageError || !image ? defaultImage : image;

  const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                            category === 'ZÁPAS' ? 'cat-zapas' : '';

  const handleImageError = () => {
    setImageError(true);
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
        className={`aktualita-image ${expanded ? 'expanded' : ''}`} // Apply 'expanded' class conditionally
        onClick={onImageClick} // Trigger onImageClick on image click
        onError={handleImageError} // Fallback on error
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
