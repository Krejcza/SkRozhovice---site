import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/mladsi_zaci_foto1.jpg';
import img2 from '../components/images/mladsi_zaci_foto2.jpg';
import img3 from '../components/images/mladsi_zaci_foto3.jpg';
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const MladsiZaci = () => {

  // Data jsou správná
  const treneri = [
    { jmeno: 'Volejník Martin', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 736 434 004'},
  ];

  const images = [img1, img2, img3];

  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Mladší žáci</title>
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
      title="MLADŠÍ ŽÁCI"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/d4c8e41c-face-48d6-b3b1-6af356c379a9'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/d4c8e41c-face-48d6-b3b1-6af356c379a9"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/d4c8e41c-face-48d6-b3b1-6af356c379a9"
      trener={treneri}
      galleryImages={images} 
      chainedTeams='Tým je složen z klubu SK Rozhovice a Jiskra Heřmanův Městec.'
    />
    </>
  );
};

export default Transition(MladsiZaci)
