import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import OKlubu from './pages/OKlubu';
import Kontakt from './pages/Kontakt';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Domů />} />
            <Route path='/Aktuality' element={<Aktuality />} />
            <Route path='/TymyDospeli' element={<TýmyDospělí />} />
            <Route path='/A-team' element={<Ateam />} />
            <Route path='/TymyMladez' element={<TýmyMládež />} />
            <Route path='/MladsiPriprava' element={<MladsiPriprava />} />
            <Route path='/StarsiPriprava' element={<StarsiPriprava />} />
            <Route path='/MladsiZaci' element={<MladsiZaci />} />
            <Route path='/StarsiZaci' element={<StarsiZaci />} />
            <Route path='/OKlubu' element={<OKlubu />} />
            <Route path='/Kontakt' element={<Kontakt />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
