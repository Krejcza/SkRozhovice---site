import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import Transition from '../Transition'

const StarsiZaci = () => {

  // Data jsou správná
  const treneri = [
    { jmeno: 'Tomčík Michal', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 775 869 281'  },
  ];

  const images = [img1, img2];

  return (
    <MainPageY
      title="STARŠÍ ŽÁCI"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/7f594d29-a244-4f24-9112-76df62c4c6b0'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/7f594d29-a244-4f24-9112-76df62c4c6b0"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/7f594d29-a244-4f24-9112-76df62c4c6b0"
      trener={treneri}
      galleryImages={images} 
      chainedTeams='Tým je složen z klubu SK Rozhovice a Jiskra Heřmanův Městec.'
    />
  );
};

export default Transition(StarsiZaci)
