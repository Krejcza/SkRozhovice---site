import React from 'react';
import MainVideo from '../components/MainVideo';
import Aktuality from '../components/HOME-page/Aktuality';
import Sponsors from '../components/HOME-page/Sponsors';
import Contact from '../components/HOME-page/Contact';
import Map from '../components/HOME-page/Map';
import Transition from '../Transition';
import { Helmet } from 'react-helmet-async';

const Domů = () => {
  return (
    <>
      <Helmet>
        <title>SK Rozhovice - Oficiální stránky</title>
        <meta
          name="description"
          content="Oficiální stránky SK Rozhovice - Koukněte na aktuality, výsledky zápasů, přehled našich hráčů nebo na historii klubu."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
      </Helmet>

      <MainVideo />
      <Aktuality />
      <Sponsors />
      <Contact />
      <Map />
    </>
  );
};

export default Transition(Domů);
