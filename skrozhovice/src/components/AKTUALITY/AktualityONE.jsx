import React from 'react'
import './AktualityMain.css'

const OneAktualita = ({ date, headline, image, text, category, lineup }) => {

   const imageUrl = image && image !== '' ? `http://localhost:5000${image}` : 'http://localhost:5000/images/default.webp';


   const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                         category === 'ZÁPAS' ? 'cat-zapas' : '';

   return (
     <div className="aktualita-container">
        <div className='category-akt'>
          <p className={`category-text ${categoryTextClass}`}>{category}</p>
          <p className='category-date'>{date}</p>
        </div>
        <img src={imageUrl} alt={headline} className="aktualita-image" />
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

export default OneAktualita
