import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Domů from './pages/Domů';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Domů />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
