
import React from 'react';
import './Navbar.css';

const Overlay = ({ isOpen, onClick }) => {
  return (
    <div
      className={`overlay ${isOpen ? 'open' : ''}`}
      onClick={onClick}
    ></div>
  );
};

export default Overlay;
