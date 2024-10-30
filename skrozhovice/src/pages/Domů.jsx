import React from 'react'
import MainVideo from '../components/MainVideo'
import Aktuality from '../components/HOME-page/Aktuality'
import Sponsors from '../components/HOME-page/Sponsors'
import Contact from '../components/HOME-page/Contact'
import Map from '../components/HOME-page/Map'
import Transition from '../Transition'
import { Helmet } from 'react-helmet';

const Domů = () => {
  return (
    <>
      <Helmet>
        <title>SK Rozhovice - Oficiální stránky</title>
        <meta name="description" content="Oficiální stránky SK Rozhovice - Sledujte aktuality, podporovatele, kontakty a najděte nás na mapě." />
        <meta name="keywords" content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty" />
      </Helmet>

      <MainVideo />
      <Aktuality />
      <Sponsors />
      <Contact />
      <Map />
    </>
  )
}

export default Transition(Domů)
