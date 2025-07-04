import React, { useState, useEffect, useRef } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const EditAktualita = ({ aktualita, onUpdate, onCancel }) => {
  const editContainerRef = useRef(null);
  const [headline, setHeadline] = useState(aktualita.headline);
  const [text, setText] = useState(aktualita.text);
  const [category, setCategory] = useState(aktualita.category);
  const [lineup, setLineup] = useState(aktualita.lineup);
  const [goal,setGoal] = useState('')
  const [date, setDate] = useState(aktualita.date.split('T')[0]); // Formátování data na 'YYYY-MM-DD'
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Funkce pro zpracování nahraného souboru
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Funkce pro odeslání aktualizovaných dat
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    let imagePath = aktualita.image;

    // Logika pro nahrání nového obrázku přes Cloudinary
    try {
      if (selectedFile) {
        const response = await fetch('https://backend-rozhovice.onrender.com/api/get-upload-url', { method: 'POST' });
        const data = await response.json();
  
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('timestamp', data.timestamp);
        formData.append('api_key', process.env.CLOUDINARY_API_KEY);
        formData.append('upload_preset', 'viyusy7k');
  
        const cloudinaryResponse = await fetch(data.url, {
          method: 'POST',
          body: formData,
        });
  
        const cloudinaryResult = await cloudinaryResponse.json();

          if (!cloudinaryResponse.ok) {
            console.error('Cloudinary Error:', cloudinaryResult);
            throw new Error(cloudinaryResult.message || 'Obrázek se nepodařilo nahrát');
          }
        
        imagePath = cloudinaryResult.secure_url; 
      }

      // Příprava aktualizovaných dat aktuality
      const formattedDate = new Date(date).toISOString();
      const updatedAktualita = {
        ...aktualita,
        date: formattedDate,
        headline,
        image: imagePath,
        text,
        goal,
        category,
        lineup,
      };

      // Odeslání dat na server metodou PUT
      const response = await fetch(`https://backend-rozhovice.onrender.com/api/aktuality/${aktualita._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedAktualita),
      });

       // Zpracování odpovědi
      if (!response.ok) {
        throw new Error('Chyba při editování aktuality');
      }

      const data = await response.json();
      setSuccessMessage('Aktualita byla úspěšně přidána');
      onUpdate(data);

    } catch (error) {
      setError(error.message || 'Nastala chyba');
    }
  };

  // useeffect pro aktualizaci stavů při změně aktuality
  useEffect(() => {
    setHeadline(aktualita.headline);
    setText(aktualita.text);
    setCategory(aktualita.category);
    setLineup(aktualita.lineup);
    setGoal(aktualita.goal || '');
    setDate(aktualita.date.split('T')[0]);
    
    // Scroll to the container using the ref
    if (editContainerRef.current) {
      editContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aktualita]);


  return (
    <div className="edit-aktualita-container" ref={editContainerRef}>
      <h2 className='editation-header'>Editovat stávající aktualitu</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="formular-pridani-akt">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Datum:
            <input
              className='date-add-form-pc'
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Nadpis:
            <input
              type="text"
              placeholder="Název aktuality"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Nahraj obrázek:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-upload-input"
            />
            <span className="file-upload-button">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            {selectedFile && <p>{selectedFile.name}</p>}
            {!selectedFile && <p>Aktuální obrázek: {aktualita.image.split('/').pop()}</p>}
          </label>
        </div>

        <div>
          <label>
            Text:
            <textarea
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Góly:
            <textarea
              placeholder="Kdo skóroval?"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Kategorie:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="INFO">INFO</option>
              <option value="ZÁPAS">ZÁPAS</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Sestava:
            <input
              type="text"
              placeholder="Barva - Pieies, Dvořák (86' Holub Martin), Vaško..."
              value={lineup}
              onChange={(e) => setLineup(e.target.value)}
            />
          </label>
        </div>

        <div className="button-group-aktul">
          <button type="submit">Potvrdit změny</button>
          <button type="button" onClick={onCancel} className="cancel-button">Zrušit editaci</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditAktualita;
