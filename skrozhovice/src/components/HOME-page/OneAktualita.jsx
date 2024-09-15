import React from 'react'

const OneAktualita = ({ date, headline, image, text }) => {
   return (
     <div className="aktualita-item">
       <img src={image} alt={headline} />
       <h2>{headline}</h2>
       <p>{date}</p>
       <p>{text}</p>
     </div>
   );
 };

export default OneAktualita
