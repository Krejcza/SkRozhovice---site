import React from 'react';
import './ContactMain.css';

const SocialButton = ({ label, url }) => {
  return (
    <a href={url} className="social-button" target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
};

export default SocialButton;
