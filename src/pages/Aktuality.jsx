import React from 'react'
import AktualityMain from '../components/AKTUALITY/AktualityMain'
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const Aktuality = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Aktuality</title>
        <meta
          name="description"
          content="Zajímá vás co se děje v klubu, co je nového nebo výsledky zápasů? Tohle jsou naše klubové aktuality."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <AktualityMain/>
    </div>
    </>
  )
}

export default Transition(Aktuality)
