import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import img3 from '../components/images/hive-pattern.png';
import img4 from '../components/images/hive-pattern.png';
import img5 from '../components/images/hive-pattern.png';
import Transition from '../Transition'

const StarsiPriprava = () => {

  // Data jsou správná
  const treneri = [
    { jmeno: 'Utterdorský Jakub', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 606 602 249'}, { jmeno: 'Žáková Denisa', pozice: 'Hlavní vedoucí', obrazek: trenerImg, telefon: '+420 728 415 383' }
  ];

  const images = [img1, img2, img3, img4, img5];

  return (
    <MainPageY
      title="STARŠÍ PŘÍPRAVKA"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/c895a344-ff93-45e1-9b56-8e5d1be4633d'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/c895a344-ff93-45e1-9b56-8e5d1be4633d"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/c895a344-ff93-45e1-9b56-8e5d1be4633d"
      trener={treneri}
      galleryImages={images}
    />
  );
};

export default Transition(StarsiPriprava)
