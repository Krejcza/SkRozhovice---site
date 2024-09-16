import { useState, useEffect } from 'react';
import OneAktualita from './AktualityONE';
import './AktualityMain.css'

const AktualityMain = () => {

   const [news, setNews] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [total, setTotal] = useState(0);
   const itemsPerPage = 5;

   useEffect(() => {
    const fetchAktuality = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/aktuality/all?page=${currentPage}&limit=${itemsPerPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched aktuality:', data);
        
        
        setNews(data.aktuality || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error fetching aktuality:', error);
      }
    };

    fetchAktuality();
  }, [currentPage]);

  return (
    <>
      <div className='main-banner-ep'>
        <h1>AKTUALITY</h1>
      </div>
  
      <div className='background-linear-deff mappp'>
        <div className="aktuality-all">
          {news.length > 0 ? (
            news.map((item) => (
              <OneAktualita
                key={item._id}
                date={new Date(item.date).toLocaleDateString()}
                headline={item.headline}
                image={item.image}
                text={item.text}
                category={item.category}
                lineup={item.lineup}
              />
            ))
          ) : (
            <p>Žádné novinky</p>
          )}
        </div>
        <div className='pagination'>
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Předchozí
          </button>
          <span>Stránka {currentPage} z {Math.ceil(total / itemsPerPage)}</span>
          <button 
            disabled={currentPage === Math.ceil(total / itemsPerPage)} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Další
          </button>
        </div>
      </div>
    </>
  );
};

export default AktualityMain;