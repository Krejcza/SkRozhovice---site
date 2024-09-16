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

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Domů />} />
            <Route path='/Aktuality' element={<Aktuality />} />
            <Route path='/TýmyDospělí' element={<TýmyDospělí />} />
            <Route path='/A-team' element={<Ateam />} />
            <Route path='/TýmyMládež' element={<TýmyMládež />} />
            <Route path='/MladsiPriprava' element={<MladsiPriprava />} />
            <Route path='/StarsiPriprava' element={<StarsiPriprava />} />
            <Route path='/MladsiZaci' element={<MladsiZaci />} />
            <Route path='/StarsiZaci' element={<StarsiZaci />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
