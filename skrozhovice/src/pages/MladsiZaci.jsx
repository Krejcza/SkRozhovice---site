import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import Transition from '../Transition'

const MladsiZaci = () => {

  const treneri = [
    { jmeno: 'Martin Král', pozice: 'Hlavní trenér', obrazek: trenerImg },
    { jmeno: 'Josef Růžička', pozice: 'Asistent trenéra', obrazek: trenerImg },
  ];

  const images = [img1, img2];

  return (
    <MainPageY
      title="MLADŠÍ ŽÁCI"
      zapasy='https://www.fotbal.cz/souteze/turnaje/zapas/example-url'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/example-url"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/example-url"
      trener={treneri}
      galleryImages={images} 
    />
  );
};

export default Transition(MladsiZaci)