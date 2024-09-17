import React from 'react';
import OneButton from './OneButton';
import './ContactMain.css';

const ContactMain = () => {
  const buttonData = [
    { label: 'Adresa', contactInfo: ['SK Rozhovice', 'Rozhovice 90', '538 03 Rozhovice'] },
    { label: 'Telefon', contactInfo: ['+123456789'] },
    { label: 'Email', contactInfo: ['info@skrozhovice.cz'] },
  ];

  return (
    <>
      <div className='main-banner-ep'>
        <h1>KONTAKT</h1>
      </div>
      <div className="button-group">
        {buttonData.map((data, index) => (
          <OneButton key={index} label={data.label} contactInfo={data.contactInfo} />
        ))}
      </div>
    </>
  );
};

export default ContactMain;
