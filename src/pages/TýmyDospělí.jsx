import React from 'react'
import Adult from '../components/ADULT/Adult'
import Transition from '../Transition'
import { Helmet } from 'react-helmet-async';

// Stránka Týmy Dospělí - s komponentami a popiskem přes react-helmet

const TýmyDospělí = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Týmy dospělí</title>
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
      <Adult />
    </div>
    </>
  )
}

export default Transition(TýmyDospělí)
