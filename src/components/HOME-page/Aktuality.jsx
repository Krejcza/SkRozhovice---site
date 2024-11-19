import React from 'react';
import OneAktualita from './OneAktualita';
import { useState, useEffect } from 'react';
import './Aktuality.css'
import '../../App.css'

// Komponenta, která dává všechny aktuality dohromady a zobrazí 3 na hlavní stránce.

const Aktuality = () => {
  const [aktuality, setAktuality] = useState([]);


  // načítá aktuality z API
  useEffect(() => {
    const fetchAktuality = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/aktuality/main');
        if (!response.ok) {
          throw new Error('Síťová odpověď nebyla v pořádku');
        }
        const data = await response.json();
        setAktuality(data);
      } catch (error) {
        console.error('Chyba při načítání aktuality:', error);
      }
    };

    fetchAktuality();
  }, []);

  return (
    <div className='background-black'>
      <h2 className='main-topic-small'>Poslední Aktuality</h2>
      <div className='all-aktuality'>

        {aktuality.map((item, index) => (
          <OneAktualita
            key={item._id}
            date={new Date(item.date).toLocaleDateString()}
            headline={item.headline}
            image={item.image}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Aktuality;
