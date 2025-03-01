import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Domů from './pages/Domů';
import Aktuality from './pages/Aktuality';
import TýmyDospělí from './pages/TýmyDospělí';
import Ateam from './pages/Ateam';
import TýmyMládež from './pages/TýmyMládež';
import MladsiPriprava from './pages/MladsiPriprava';
import StarsiPriprava from './pages/StarsiPriprava';
import MladsiZaci from './pages/MladsiZaci';
import StarsiZaci from './pages/StarsiZaci';
import Dorost from './pages/Dorost';
import OKlubu from './pages/OKlubu';
import Kontakt from './pages/Kontakt';
import ErrorPage from './pages/ErrorPage';
import LoginUser from './pages/LoginUser';
import BottomToTop from './components/BottomToTop';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import CookieConsentBanner from './components/CookieConsentBanner';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


// Složení stránek a odkazů na ně 



const App = () => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = decodedToken.exp - currentTime;
      
      if (remainingTime > 0) {
        setIsLoggedIn(true);
        setUserInfo(decodedToken.username);
        setRemainingTime(remainingTime);
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserInfo(null);
    setRemainingTime(null);
    alert('Token vypršel, byli jste odhlášeni.');
  };

  return (
    <HelmetProvider>
      <ScrollToTop />
      <CookieConsentBanner />
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
      <BottomToTop />
    </HelmetProvider>
  );
};

export default App;
