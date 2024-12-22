import React from 'react';
import OneAktualita from './OneAktualita';
import { useState, useEffect } from 'react';
import './Aktuality.css'
import '../../App.css'

// Komponenta, která dává všechny aktuality dohromady a zobrazí 3 na hlavní stránce.

const Aktuality = () => {
  const [aktuality, setAktuality] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  // načítá aktuality z API
  useEffect(() => {
    const fetchAktuality = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-rozhovice.onrender.com/api/aktuality/main');
        if (!response.ok) {
          throw new Error('Síťová odpověď nebyla v pořádku');
        }
        const data = await response.json();
        setAktuality(data);
        setError(null);
      } catch (error) {
        console.error('Chyba při načítání aktuality:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAktuality();
  }, []);

  const Loader = () => (
    <div className="loader-container-main">
      <div className="loader-main">
        <div className="spinner-main"></div>
        <p>Načítání aktualit. Prosíme o strpení.</p>
      </div>
    </div>
  );

  return (
    <div className='background-black'>
      <h2 className='main-topic-small'>Poslední Aktuality</h2>
      <div className='all-aktuality'>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <p>Nepodařilo se načíst aktuality: {error}</p>
          </div>
        ) : aktuality.length === 0 ? (
          <p>Žádné aktuality nebyly nalezeny.</p>
        ) : (
          aktuality.map((item) => (
            <OneAktualita
              key={item._id}
              date={new Date(item.date).toLocaleDateString()}
              headline={item.headline}
              image={item.image}
              text={item.text}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Aktuality;
