import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const MladsiPriprava = () => {

  // Data jsou správná
  const treneri = [
      { jmeno: 'Stejskal David', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 723 739 151' }, { jmeno: 'Žáková Denisa', pozice: 'Hlavní vedoucí', obrazek: trenerImg, telefon: '+420 728 415 383' }
  ];

  const images = [img1, img2];

  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Mladší Přípravka</title>
        <meta
          name="description"
          content="Dorost SK Rozhovice - informace o týmu, trenérech, zápasech, statistikách a výsledcích.."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <MainPageY
      title="MLADŠÍ PŘÍPRAVKA"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/7913eabf-e52b-4114-861a-2c0300203c0a'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/7913eabf-e52b-4114-861a-2c0300203c0a"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/7913eabf-e52b-4114-861a-2c0300203c0a"
      trener={treneri}
      galleryImages={images}
    />
    </>
  );
};

export default Transition(MladsiPriprava)
