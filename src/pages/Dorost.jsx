import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/hive-pattern-gold.png';
import img2 from '../components/images/hive-pattern.png';
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const Dorost = () => {

   // Data jsou správná
   const treneri = [
      { jmeno: 'Uhlíř Jan', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 733 192 667'  },
   ];

 const images = [img1, img2];

 return (
  <>
  <Helmet>
    <title>SK Rozhovice - Dorost</title>
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
     title="DOROST"
     zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/9cfc6de5-cadf-4ae9-a7d7-6a62df9b9eaf'
     statistiky="https://www.fotbal.cz/souteze/turnaje/stats/9cfc6de5-cadf-4ae9-a7d7-6a62df9b9eaf"
     tabulka="https://www.fotbal.cz/souteze/turnaje/table/9cfc6de5-cadf-4ae9-a7d7-6a62df9b9eaf"
     trener={treneri}
     galleryImages={images} 
     chainedTeams='Tým je složen z klubu SK Rozhovice a Jiskra Heřmanův Městec.'
   />
   </>
 );
};

export default Transition(Dorost)
