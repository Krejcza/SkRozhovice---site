import React from 'react'
import ContactMain from '../components/KONTAKT/ContactMain'
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const Kontakt = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Kontakt</title>
        <meta
          name="description"
          content="Chcete se nám ozvat, najít trenéra nebo naše hřiště? Na naší kontaktní stránce se dozvíte vše, co potřebujete."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <ContactMain />
    </div>
    </>
  )
}

export default Transition(Kontakt)
