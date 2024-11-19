import React from 'react';
import './ContactMain.css';

// komponenta na tlačítko, které odkazuje na sociální sítě

const SocialButton = ({ label, url }) => {
  return (
    <a href={url} className="social-button" target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
};

export default SocialButton;
