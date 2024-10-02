import React from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Domů from './pages/Domů';
import Aktuality from './pages/Aktuality';
import TýmyDospělí from './pages/TýmyDospělí';
import Ateam from './pages/Ateam';
import TýmyMládež from './pages/TýmyMládež';
import MladsiPriprava from './pages/MladsiPriprava';
import StarsiPriprava from './pages/StarsiPriprava';
import MladsiZaci from './pages/MladsiZaci';
import StarsiZaci from './pages/StarsiZaci';
import Dorost from './pages/Dorost'
import OKlubu from './pages/OKlubu';
import Kontakt from './pages/Kontakt';
import ErrorPage from './pages/ErrorPage';
import LoginUser from './pages/LoginUser';
import { AnimatePresence } from 'framer-motion'

const App = () => {

  const location = useLocation()

  return (
    <>
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route index path='/' element={<Domů />} />
              <Route path='/Aktuality' element={<Aktuality />} />
              <Route path='/TymyDospeli' element={<TýmyDospělí />} />
              <Route path='/Ateam' element={<Ateam />} />
              <Route path='/TymyMladez' element={<TýmyMládež />} />
              <Route path='/MladsiPriprava' element={<MladsiPriprava />} />
              <Route path='/StarsiPriprava' element={<StarsiPriprava />} />
              <Route path='/MladsiZaci' element={<MladsiZaci />} />
              <Route path='/StarsiZaci' element={<StarsiZaci />} />
              <Route path='/Dorost' element={<Dorost />} />
              <Route path='/OKlubu' element={<OKlubu />} />
              <Route path='/Kontakt' element={<Kontakt />} />
              <Route path='/LoginUser' element={<LoginUser />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
        </AnimatePresence>
        <Footer />
    </>
  )
}

export default App
