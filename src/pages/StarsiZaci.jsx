import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/starsi_zaci_foto2.jpg';
import img2 from '../components/images/starsi_zaci_foto1.jpg';
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const StarsiZaci = () => {

  // Data jsou správná
  const treneri = [
    { jmeno: 'Tomčík Michal', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 775 869 281'  },
  ];

  const images = [img1, img2];

  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Starší žáci</title>
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
      title="STARŠÍ ŽÁCI"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/7f594d29-a244-4f24-9112-76df62c4c6b0'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/7f594d29-a244-4f24-9112-76df62c4c6b0"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/7f594d29-a244-4f24-9112-76df62c4c6b0"
      trener={treneri}
      galleryImages={images} 
      chainedTeams='Tým je složen z klubu SK Rozhovice a Jiskra Heřmanův Městec.'
    />
    </>
  );
};

export default Transition(StarsiZaci)
