import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';

const StarsiZaci = () => {

  const treneri = [
    { jmeno: 'Pavel Novotný', pozice: 'Hlavní trenér', obrazek: trenerImg },
    { jmeno: 'Lukáš Dvořák', pozice: 'Asistent trenéra', obrazek: trenerImg },
  ];

  const images = [img1, img2];

  return (
    <MainPageY
      title="STARŠÍ ŽÁCI"
      zapasy='https://www.fotbal.cz/souteze/turnaje/zapas/example-url'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/example-url"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/example-url"
      trener={treneri}
      galleryImages={images} 
    />
  );
};

export default StarsiZaci;
