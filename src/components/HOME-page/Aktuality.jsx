import React from 'react';
import OneAktualita from './OneAktualita';
import { useState, useEffect } from 'react';
import './Aktuality.css'
import '../../App.css'

const Aktuality = () => {
  const [aktuality, setAktuality] = useState([]);

  useEffect(() => {
    const fetchAktuality = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/aktuality/main');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched aktuality:', data);
        setAktuality(data);
      } catch (error) {
        console.error('Error fetching aktuality:', error);
      }
    };

    fetchAktuality();
  }, []);

  return (
    <div className='background-black'>
      <h2 className='main-topic-small'>Poslední Aktuality</h2>
      <div className='all-aktuality'>

        {aktuality.map((item) => (
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
