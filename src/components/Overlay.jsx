import React from 'react';
import './Navbar.css';

const Overlay = ({ isOpen, onClick }) => {
  return (
    <div 
      className={`overlay ${isOpen ? 'open' : ''}`} 
      onClick={onClick} 
    />
  );
};

export default Overlay;
