import React, { useState } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const OneAktualita = ({ date, headline, image, text, category, lineup, onImageClick }) => {
  const [imageError, setImageError] = useState(false);
  const [expander, setExpander] = useState(false);
  const [iconDirection, setIconDirection] = useState(faChevronRight);

  const defaultImage = 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1731591618/SkRozhovice/ooo6wxdqeuzyybxxcgbx.webp';
  const imageUrl = imageError || !image ? defaultImage : image;

  const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                            category === 'ZÁPAS' ? 'cat-zapas' : '';

  const handleImageError = () => {
    setImageError(true);
    console.log('Image failed to load, falling back to default');
  };

  const toggleImageExpansion = () => {
    setExpander(!expander); 
    setIconDirection(expander ? faChevronRight : faChevronLeft); 
  };

  return (
    <div className="aktualita-container">
      <div className='category-akt'>
        <p className={`category-text ${categoryTextClass}`}>{category}</p>
        <p className='category-date'>{date}</p>
      </div>

      <div className="only-imagination">
        <img 
          src={imageUrl}
          alt={headline} 
          className={`aktualita-image ${expander ? 'expanded' : ''}`} 
          onClick={toggleImageExpansion} 
          onError={handleImageError} 
        />
        <div className={`icon-next ${expander ? 'expanded' : ''}`} onClick={toggleImageExpansion}>  
          <FontAwesomeIcon icon={iconDirection} />
        </div>
      </div>

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
