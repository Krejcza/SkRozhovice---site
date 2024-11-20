import { useState, useEffect, useCallback } from 'react';
import OneAktualita from './AktualityONE';
import AddAktualita from './AddAktualita';
import './AktualityMain.css';
import DeleteAktualita from './DeleteAktualita';
import EditAktualita from './EditAktualita';
import { motion } from 'framer-motion';

const AktualityMain = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAktualita, setEditingAktualita] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const itemsPerPage = 5;
  const pagesToShow = 3;

  // Načtení aktualit z API
  const fetchAktuality = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/aktuality/all?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error(`Chyba při načítání dat: ${response.status}`);
      const data = await response.json();
      setNews(data.aktuality || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Chyba při načítání dat:', err);
      setError('Nepodařilo se načíst zprávy. Zkuste to prosím později.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchAktuality();
  }, [fetchAktuality]);

  
  const totalPages = Math.ceil(total / itemsPerPage);

  // Výpočet stránek pro stránkování
  const getPageNumbers = () => {
    const totalPageNumbersToShow = Math.min(pagesToShow, totalPages);
    let startPage = Math.max(1, currentPage - Math.floor(totalPageNumbersToShow / 2));
    let endPage = startPage + totalPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - totalPageNumbersToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const isLoggedIn = !!localStorage.getItem('token');

   // Handlery pro manipulaci s aktualitami
  const handleAddAktualita = (newAktualita) => {
    setNews((prevNews) => [newAktualita, ...prevNews]);
    setTotal((prevTotal) => prevTotal + 1);
  };

  const handleDeleteAktualita = (id) => {
    setNews((prevNews) => prevNews.filter((item) => item._id !== id));
    setTotal((prevTotal) => prevTotal - 1);
  };

  const handleEditAktualita = (updatedAktualita) => {
    setNews((prevNews) =>
      prevNews.map((item) => (item._id === updatedAktualita._id ? updatedAktualita : item))
    );
    setEditingAktualita(null);
  };


  const handleImageClick = (imageId) => {
    setExpandedImage(prev => (prev === imageId ? null : imageId));
  };


  return (
    <>
      <div className='main-banner-ep'>
        <h1>AKTUALITY</h1>
      </div>

      <div className='background-linear-deff mappp minhei'>
        <div className="aktuality-all">
          {loading ? (
            <p  className='loader'></p>
          ) : error ? (
            <p>{error}</p>
          ) : news.length > 0 ? (
            news.map((item, index) => (
              <motion.article
                    key={item._id}
                    className="aktualita-wrapper"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                      duration: 0.5, 
                      delay: index * 0.2, 
                    }}
              >
              <article key={item._id} className="aktualita-wrapper">
                <OneAktualita
                  id={item._id}
                  date={new Date(item.date).toLocaleDateString()}
                  headline={item.headline}
                  image={item.image}
                  text={item.text}
                  category={item.category}
                  lineup={item.lineup}
                  onImageClick={() => handleImageClick(item._id)}
                  expanded={expandedImage === item._id}
                />
                {isLoggedIn && (
                  <div className="aktualita-actions">
                    <button className='edit-button' onClick={() => setEditingAktualita(item)}>Upravit</button>
                    <DeleteAktualita id={item._id} onDelete={handleDeleteAktualita} />
                  </div>
                )}
              </article>
              </motion.article>
            ))
          ) : (
            <p>Žádné novinky</p>
          )}
        </div>

        {isLoggedIn && <AddAktualita onAdd={handleAddAktualita} />}
        {editingAktualita && (
          <EditAktualita aktualita={editingAktualita} onUpdate={handleEditAktualita} />
        )}

        <div className='pagination'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Předchozí
          </button>

          {getPageNumbers().map(page => (
            <button
              key={page}
              className={page === currentPage ? 'active' : ''}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
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
