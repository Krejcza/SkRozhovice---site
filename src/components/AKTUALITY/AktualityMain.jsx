import { useState, useEffect, useCallback } from 'react';
import OneAktualita from './AktualityONE';
import AddAktualita from './AddAktualita';
import './AktualityMain.css';
import DeleteAktualita from './DeleteAktualita';
import EditAktualita from './EditAktualita';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';


const AktualityMain = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAktualita, setEditingAktualita] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmedQuery, setConfirmedQuery] = useState('');
  const [allNews, setAllNews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const pagesToShow = 3;

  // Načtení aktualit z API
  const fetchAllAktuality = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Načteme všechny aktuality najednou (bez stránkování)
      const response = await fetch(`https://backend-rozhovice.onrender.com/api/aktuality/all?limit=1000`);
      if (!response.ok) throw new Error(`Chyba při načítání dat: ${response.status}`);
      const data = await response.json();
      setAllNews(data.aktuality || []);
    } catch (err) {
      console.error('Chyba při načítání dat:', err);
      setError('Nepodařilo se načíst zprávy. Zkuste to prosím později.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllAktuality();
  }, [fetchAllAktuality]);

  const scrollToAddForm = () => {
    const addFormElement = document.querySelector('.add-aktualita-container');
    if (addFormElement) {
      addFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (allNews.length > 0) {
      let filteredResults = allNews;

      if (confirmedQuery) {
        filteredResults = allNews.filter(item => {
          const matchesText = item.headline.toLowerCase().includes(confirmedQuery.toLowerCase()) ||
                            item.text.toLowerCase().includes(confirmedQuery.toLowerCase());
          
          if (isValidDateFormat(confirmedQuery)) {
            return formatDateForComparison(item.date) === confirmedQuery;
          }
          
          return matchesText;
        });
      }

      setTotal(filteredResults.length);
      
      // Aplikujeme stránkování na filtrované výsledky
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setNews(filteredResults.slice(startIndex, endIndex));
    }
  }, [allNews, currentPage, confirmedQuery]);

  
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

  const handleSearchConfirm = () => {
    setIsSearching(true); // Začátek vyhledávání
    setConfirmedQuery(searchQuery);
    setCurrentPage(1);
    setTimeout(() => {
      setIsSearching(false); // Konec vyhledávání
    }, 500);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'auto' }); 
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setConfirmedQuery('');
    setCurrentPage(1);
  };

  const isValidDateFormat = (str) => {
    // Upravený regex aby přijímal i jednociferná čísla pro den a měsíc
    const dateRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    if (!dateRegex.test(str)) return false;
    
    const [_, day, month, year] = str.match(dateRegex);
    const date = new Date(year, month - 1, day);
    return date.getDate() === parseInt(day) && 
           date.getMonth() === parseInt(month) - 1 && 
           date.getFullYear() === parseInt(year);
  };

  const formatDateForComparison = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;  // odstraněno padStart
  };

  const filteredNews = news.filter(item => {
    if (!confirmedQuery) return true;  
  
    // Pokud je vstup ve formátu data (DD.MM.YYYY)
    if (isValidDateFormat(confirmedQuery)) { 
      return formatDateForComparison(item.date) === confirmedQuery;  
    }
  
    return item.headline.toLowerCase().includes(confirmedQuery.toLowerCase()) ||  
           item.text.toLowerCase().includes(confirmedQuery.toLowerCase()); 
  });

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span style="background-color: red; color: white;">$1</span>');
  };

  


  return (
    <>
      <div className='main-banner-ep'>
        <h1>AKTUALITY</h1>
      </div>

      <div className='background-linear-deff mappp minhei'>
      <div className="search-bar">
      <input
            type="text"
            placeholder="Hledat aktuality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
            className={`magnifying-glass ${isSearching ? 'searching' : ''}`} 
            onClick={handleSearchConfirm}
            disabled={isSearching}
          >
            <FontAwesomeIcon 
              className='magnifying-glass' 
              icon={faMagnifyingGlass} 
              spin={isSearching} 
            />
          </button>
          {searchQuery && (
            <button 
              className='clear-search' 
              onClick={handleClearSearch}
              disabled={isSearching}
            >
              ✖
            </button>
          )}
        </div>
        {isLoggedIn && (
          <div className="newsPlusButton">  
            <button 
              className="add-news-button"
              onClick={scrollToAddForm}
            >
              <p>Přidat aktualitu</p>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          )}

        {confirmedQuery && total > 0 && (
          <div className="searchResultWrapper">
            <p className="search-results-info">
              Nalezeno {total} výsledků pro "{confirmedQuery}"
            </p>
          </div>
        )}

        
        <div className="aktuality-all">
          {loading ? (
            <div className='loaderer-div'>
              <div className='loader-aktall'></div>
              <p>Načítání aktualit. Prosíme o strpení.</p>
            </div>
          ) : error ? (
            <p className='erorik'>{error}</p>
          ) : isSearching ? (
            <div className='loaderer-div'>
              <div className='loader-aktall'></div>
              <p>Vyhledávání aktualit...</p>
            </div>
          ) : filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
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
                  goal={item.goal}
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
            <p className='no-news-today'>Žádné aktuality</p>
          )}
        </div>

        

        {total > itemsPerPage && (
          <div className='pagination'>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)} // Upraveno
            >
              Předchozí
            </button>

            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Další
            </button>
          </div>
        )}

        {isLoggedIn && <AddAktualita onAdd={handleAddAktualita} />}
        {editingAktualita && (
          <EditAktualita 
            aktualita={editingAktualita} 
            onUpdate={handleEditAktualita} 
            onCancel={() => setEditingAktualita(null)}
          />
        )}

        
      </div>
    </>
  );
};

export default AktualityMain;
