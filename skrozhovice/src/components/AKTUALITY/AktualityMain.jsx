import { useState, useEffect } from 'react';
import OneAktualita from './AktualityONE';
import './AktualityMain.css';

const AktualityMain = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [newAktualita, setNewAktualita] = useState({
    headline: '',
    text: '',
    image: '',
    category: 'INFO',
    lineup: '',
    date: new Date(),
  });
  const [editingAktualitaId, setEditingAktualitaId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const itemsPerPage = 5;
  const pagesToShow = 3;

  useEffect(() => {
    const fetchAktuality = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/aktuality/all?page=${currentPage}&limit=${itemsPerPage}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setNews(data.aktuality || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error fetching aktuality:', error.message);
        setError('Error fetching news. Please try again later.');
      }
    };

    fetchAktuality();
  }, [currentPage]);

  const handleAddOrEditAktualita = async (e) => {
    e.preventDefault();
  
    // Ensure all required fields are populated
    if (!newAktualita.headline || !newAktualita.text || !newAktualita.category || !newAktualita.date) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('headline', newAktualita.headline);
    formData.append('text', newAktualita.text);
    formData.append('category', newAktualita.category);
    formData.append('lineup', newAktualita.lineup);
    formData.append('date', newAktualita.date.toISOString());
  
    if (newAktualita.image) {
      formData.append('image', newAktualita.image);
    }

    try {
      const response = await fetch(editingAktualitaId 
        ? `http://localhost:5000/api/aktuality/edit/${editingAktualitaId}` 
        : 'http://localhost:5000/api/aktuality/add', 
        {
          method: editingAktualitaId ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (editingAktualitaId) {
          setNews(news.map(item => item._id === editingAktualitaId ? result : item));
          setEditingAktualitaId(null);
          setIsEditMode(false);
        } else {
          setNews([result, ...news]);
        }
        resetForm();
        alert(editingAktualitaId ? 'Aktualita byla úspěšně upravena' : 'Aktualita byla úspěšně přidána');
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error('Error adding/updating aktualita:', error.message);
      setError('Server error');
    }
  };

  const resetForm = () => {
    setNewAktualita({
      headline: '',
      text: '',
      image: '',
      category: 'INFO',
      lineup: '',
      date: new Date(),
    });
    setError('');
  };

  const handleEditClick = (aktualita) => {
    setNewAktualita({
      headline: aktualita.headline,
      text: aktualita.text,
      image: '', // Reset the image for editing
      category: aktualita.category,
      lineup: aktualita.lineup,
      date: new Date(aktualita.date),
    });
    setEditingAktualitaId(aktualita._id);
    setIsEditMode(true);
  };

  const handleDeleteAktualita = async (id) => {
    if (window.confirm('Opravdu chcete smazat tuto aktualitu?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/aktuality/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          setNews(news.filter(item => item._id !== id));
          alert('Aktualita byla úspěšně smazána');
        } else {
          const { message } = await response.json();
          setError(message);
        }
      } catch (error) {
        console.error('Error deleting aktualita:', error.message);
        setError('Server error');
      }
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);
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

  return (
    <>
      <div className='main-banner-ep'>
        <h1>AKTUALITY</h1>
      </div>

      <div className='background-linear-deff mappp minhei'>
        <div className="aktuality-all">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item._id}>
                <OneAktualita
                  date={new Date(item.date).toLocaleDateString()}
                  headline={item.headline}
                  image={item.image}
                  text={item.text}
                  category={item.category}
                  lineup={item.lineup}
                />
                {isLoggedIn && (
                  <>
                    <button onClick={() => handleEditClick(item)}>Upravit</button>
                    <button onClick={() => handleDeleteAktualita(item._id)}>Smazat</button>
                  </>
                )}
              </div>
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

        {/* Picker for Add/Edit mode */}
        {isLoggedIn && (
          <div className="mode-picker">
            <label>
              <input
                type="radio"
                value="add"
                checked={!isEditMode}
                onChange={() => {
                  setIsEditMode(false);
                  resetForm();
                }}
              />
              Přidat aktualitu
            </label>
            <label>
              <input
                type="radio"
                value="edit"
                checked={isEditMode}
                onChange={() => {
                  setIsEditMode(true);
                  resetForm();
                }}
              />
              Upravit aktualitu
            </label>
          </div>
        )}

        {/* Form for adding or editing aktualita */}
        {isLoggedIn && (
          <div className="add-aktualita">
            <h2>{isEditMode ? 'Upravit aktualitu' : 'Přidat novou aktualitu'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleAddOrEditAktualita}>
              <div className="input-group">
                <label htmlFor="headline">Titulek:</label>
                <input
                  type="text"
                  id="headline"
                  value={newAktualita.headline}
                  onChange={(e) => setNewAktualita({ ...newAktualita, headline: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="text">Text:</label>
                <textarea
                  id="text"
                  value={newAktualita.text}
                  onChange={(e) => setNewAktualita({ ...newAktualita, text: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="category">Kategorie:</label>
                <select
                  id="category"
                  value={newAktualita.category}
                  onChange={(e) => setNewAktualita({ ...newAktualita, category: e.target.value })}
                >
                  <option value="INFO">INFO</option>
                  <option value="EVENT">UDÁLOST</option>
                  <option value="OTHER">JINÉ</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="lineup">Sestava:</label>
                <input
                  type="text"
                  id="lineup"
                  value={newAktualita.lineup}
                  onChange={(e) => setNewAktualita({ ...newAktualita, lineup: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="date">Datum:</label>
                <input
                  type="date"
                  id="date"
                  value={newAktualita.date.toISOString().split('T')[0]}
                  onChange={(e) => setNewAktualita({ ...newAktualita, date: new Date(e.target.value) })}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="image">Obrázek:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setNewAktualita({ ...newAktualita, image: e.target.files[0] })}
                />
              </div>
              <button type="submit">{isEditMode ? 'Upravit' : 'Přidat'}</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AktualityMain;
