import React from 'react';
import MainPageY from '../components/YOUNG-subpages/MainPageY';
import trenerImg from '../components/images/blank-profile-pic.webp';
import img1 from '../components/images/starsi_pripravka_foto1.jpg';
import img2 from '../components/images/starsi_pripravka_foto2.jpg';
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

// Stránka Starší Příprava - s komponentami a popiskem přes react-helmet, kde se data trenérů načítají odtud s arraye. Při úpravě je třeba přidat/odebrat jméno, obrázek nahrát a změnit pozici popřípadě. Pro aktualizaci dat z webu fotbal.cz se používá tato stránka -- ne v komponentě

const StarsiPriprava = () => {

  // Data jsou správná - 19.11.2024
  const treneri = [
    { jmeno: 'Uttendorský Jakub', pozice: 'Trenér', obrazek: trenerImg, telefon: '+420 606 602 249'}, { jmeno: 'Žáková Denisa', pozice: 'Hlavní vedoucí', obrazek: trenerImg, telefon: '+420 728 415 383' }
  ];

  const images = [img1, img2];

  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Starší přípravka</title>
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
      title="STARŠÍ PŘÍPRAVKA"
      zapasy='https://www.fotbal.cz/souteze/turnaje/hlavni/c895a344-ff93-45e1-9b56-8e5d1be4633d'
      statistiky="https://www.fotbal.cz/souteze/turnaje/stats/c895a344-ff93-45e1-9b56-8e5d1be4633d"
      tabulka="https://www.fotbal.cz/souteze/turnaje/table/c895a344-ff93-45e1-9b56-8e5d1be4633d"
      trener={treneri}
      galleryImages={images}
    />
    </>
  );
};

export default Transition(StarsiPriprava)
