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
  const treneri = [
    { jmeno: 'Marek Procházka', pozice: 'Hlavní trenér', obrazek: trenerImg, telefon: '+420 123 456 789' },
    { jmeno: 'Karel Veselý', pozice: 'Asistent trenéra', obrazek: trenerImg, telefon: '+420 987 654 321' },
  ];

  const images = [img1, img2, img3, img4, img5];

  return (
    <MainPageY
      title="STARŠÍ PŘÍPRAVKA"
      zapasy='https://www.fotbal.cz/souteze/turnaje/zapas/example-url'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/example-url"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/example-url"
      trener={treneri}
      galleryImages={images} // Správně předané pole obrázků
    />
  );
};

export default Transition(StarsiPriprava)
