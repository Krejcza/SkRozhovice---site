import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import Transition from '../Transition'

const MladsiPriprava = () => {
  const treneri = [
    { jmeno: 'Jan Novák', pozice: 'Hlavní trenér', obrazek: trenerImg, telefon: '+420 123 456 789' }, { jmeno: 'Denis Dvořák', pozice: 'Hlavní trenér', obrazek: trenerImg, telefon: '+420 123 456 789' },
  ];

  const images = [img1, img2];

  return (
    <MainPageY
      title="MLADŠÍ PŘÍPRAVKA"
      zapasy='https://www.fotbal.cz/souteze/turnaje/zapas/example-url'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/example-url"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/example-url"
      trener={treneri}
      galleryImages={images}
    />
  );
};

export default Transition(MladsiPriprava)
