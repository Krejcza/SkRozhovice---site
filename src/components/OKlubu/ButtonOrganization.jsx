import React from 'react';
import './AboutClub.css'; // Ujisti se, že CSS soubor je importován

const ButtonOrganization = ({ pozice, jmeno }) => {
  return (
    <div className="organization-main">
      {pozice.map((position, index) => (
        <div className="organization-item" key={index}>
          <div className="positionorg">
            {position}
            <div className="namingorg">{jmeno[index]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonOrganization;