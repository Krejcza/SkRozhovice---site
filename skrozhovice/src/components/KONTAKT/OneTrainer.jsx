import React from 'react';
import './ContactMain.css';

const OneTrainer = ({ image, name, position, phone, isInverse }) => {
  return (
    <div className="trainer-container">
      <img src={image} alt={name} className="trainer-image" />
      <div className="trainer-info">
        <h3 className={`trainer-name ${isInverse ? 'inv' : ''}`}>{name}</h3>
        <p className={`trainer-position  ${isInverse ? 'inv' : ''}`}>{position}</p>
        <p className={`trainer-phone ${isInverse ? 'inv' : ''}`}>{phone}</p>
      </div>
    </div>
  );
};

export default OneTrainer;
