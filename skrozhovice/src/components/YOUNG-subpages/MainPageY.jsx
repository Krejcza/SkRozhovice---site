import React from 'react';
import './MainPageY.css'
import Gallery from './Gallery';


const MainPageY = ({ title, zapasy, statistiky, tabulka, trener, galleryImages }) => {

  return (
    <>
      <div className='main-banner-ep'>
        <h1>{title}</h1>
      </div>
      <div className='background-linear-deff'>
        <div className='content-container'>
          <div className='buttons-team-y'>
            <a href={zapasy} target="_blank" rel="noopener noreferrer" className="button-zapasy">
              Zápasy
            </a>
            <a href={statistiky} target="_blank" rel="noopener noreferrer" className="button-statistiky">
              Statistiky
            </a>
            <a href={tabulka} target="_blank" rel="noopener noreferrer" className="button-tabulka">
              Tabulka
            </a>
          </div>
          
          <Gallery images={galleryImages} />
        </div>
      </div>
      <div className="background-yellow wyc">
        <h2 className='main-topic-small bl'>Trenéři</h2>
        <div className="trenery-sekce">
          {trener.map((trener, index) => (
            <div key={index} className="trener-box">
              <img src={trener.obrazek} alt={trener.jmeno} />
              <h3>{trener.jmeno}</h3>
              <p>{trener.pozice}</p>
              <h5>{trener.telefon}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default MainPageY;