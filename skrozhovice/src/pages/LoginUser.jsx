import React from 'react'
import Transition from '../Transition'
import LoginPage from '../components/LOGIN/LoginPage'
import { Helmet } from 'react-helmet-async';

const LoginUser = () => {
  return (
    <>
    <Helmet>
    <title>SK Rozhovice - Přihlášení</title>
        <meta
          name="description"
          content="Tato stránka je určena pro přihlášení admina k editaci stránky."
        />
        <meta
          name="keywords"
          content="SK Rozhovice, fotbal, sportovní klub, aktuality, kontakty"
        />
    </Helmet>
    <div>
      <LoginPage />
    </div>
    </>
  )
}

export default Transition(LoginUser)
