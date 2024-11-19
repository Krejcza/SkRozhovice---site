import React, { useState } from 'react';
import './OneButton.css';

// Tlačítka, které ukazují nahoře na stránce, adresu, telefon a email.

const OneButton = ({ label, contactInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="button-container">
      <button className="toggle-button" onClick={toggleOpen}>
        {label}
      </button>
      <div className={`slide-content ${isOpen ? 'open' : ''}`}>
        {contactInfo.map((info, index) => (
          <p key={index}>{info}</p>
        ))}
      </div>
    </div>
  );
};

export default OneButton;
