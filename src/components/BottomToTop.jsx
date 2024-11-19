import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import './BottomToTop.css';

// Komponenta na vyjetí nahoru na stránku, na kterou uživatel může klikout

const BottomToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // funkce, když uživatel sjede více jak 300px tak se mu zobrazí tlačítko na vyjetí nahoru na stránku

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // funkce, která zajišťuje vyjetí nahoru na stránku

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // useEffect, se stará o sledování změn při scrollovaná na stránce a spouští funkci aby se ukázalo tlačítko

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`scrolly-to-top ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} className="scroll-button">
        <FontAwesomeIcon icon={faAnglesUp} size="2x" />
      </button>
    </div>
  );
};

export default BottomToTop;
