import React from 'react'
import Youngers from '../components/YOUNGERS/Young'
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

const TýmyMládež = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Týmy mládež</title>
        <meta
          name="description"
          content="Dorost SK Rozhovice - informace o týmu, trenérech, zápasech, statistikách a výsledcích.."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <Youngers />
    </div>
    </>
  )
}

export default Transition(TýmyMládež)
