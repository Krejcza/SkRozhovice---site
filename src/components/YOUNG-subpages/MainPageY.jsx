import React from 'react';
import './MainPageY.css'
import Gallery from './Gallery';
import { motion } from 'framer-motion';

// Komponenta jednotlivých týmů mladších, která vrací odkazy na zápasy, statistiky, tabulky. Upravuje se v /pages.


const MainPageY = ({ title, zapasy, statistiky, tabulka, trener, galleryImages, chainedTeams }) => {

  return (
    <>
      <div className='main-banner-ep'>
        <h1>{title}</h1>
      </div>
      <div className='background-linear-deff'>
        <p className='chained-teams'>{chainedTeams}</p>
        <div className='content-container'>
        <motion.div
                className="pickme-animation"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.5, 
                }}
        >
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
        </motion.div>


        <motion.div
                className="pickme-animation"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.5, 
                }}
        >       
          <Gallery images={galleryImages} />
        </motion.div> 
        </div>
      </div>

      <div className="background-yellow wyc nb">
        <h2 className='main-topic-small bl'>Trenéři</h2>
        <div className="trenery-sekce">
          {trener.map((trener, index) => (
            <motion.div
            key={index}
            className="trener-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.3,
            }}
          >
              <img src={trener.obrazek} alt={trener.jmeno} />
              <h3>{trener.jmeno}</h3>
              <p>{trener.pozice}</p>
              <h5>{trener.telefon}</h5>
      
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};


export default MainPageY;