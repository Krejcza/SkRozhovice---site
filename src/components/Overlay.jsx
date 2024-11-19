import React from 'react';
import './Navbar.css';

// Komponenta na Overlay, který vyjede když v mobilní verzi otevřu menu. Je to černá část schovaná pod menu.

const Overlay = ({ isOpen, onClick }) => {
  return (
    <div 
      className={`overlay ${isOpen ? 'open' : ''}`} 
      onClick={onClick} 
    />
  );
};

export default Overlay;
