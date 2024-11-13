import React from 'react'
import AboutClub from '../components/OKlubu/AboutClub'
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const OKlubu = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - O Klubu</title>
        <meta
          name="description"
          content="Zajímá vás naše historie a čím si klub prošel? Informace o hřišti nebo náš týmový maskot? Vítejte v sekci O klubu!"
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <AboutClub/>
    </div>
    </>
  )
}

export default Transition(OKlubu)
