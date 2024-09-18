import React from 'react'
import MainVideo from '../components/MainVideo'
import Aktuality from '../components/HOME-page/Aktuality'
import Sponsors from '../components/HOME-page/Sponsors'
import Contact from '../components/HOME-page/Contact'
import Map from '../components/HOME-page/Map'
import Transition from '../Transition'

const Domů = () => {
  return (
    <>
      <MainVideo />
      <Aktuality />
      <Sponsors />
      <Contact />
      <Map />
    </>
  )
}

export default Transition(Domů)
