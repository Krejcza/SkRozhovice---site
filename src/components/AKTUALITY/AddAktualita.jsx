import React, { useState } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// Komponenta, která dokáže přidávat aktuality uživatelem.

const AddAktualita = ({ onAdd }) => {
  const [headline, setHeadline] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('INFO');
  const [lineup, setLineup] = useState('');
  const [date, setDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  // Funkce pro zpracování nahraného souboru
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  // Hlavní funkce pro odeslání formuláře
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset stavů před odesláním
    setError('');
    setSuccessMessage('');
  
    let imagePath = "/uploads/default.webp";
      // Logika pro nahrání obrázku na Cloudinary
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
  
  
      // Příprava dat pro odeslání na server
      const formattedDate = new Date(date).toISOString();
      const aktualitaData = {
        date: formattedDate,
        headline,
        image: imagePath, 
        text,
        category,
        lineup,
      };

      // Odeslání dat na backend
      const response = await fetch('https://backend-rozhovice.onrender.com/api/aktuality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(aktualitaData),
      });

      // Kontrola odpovědi
      if (!response.ok) throw new Error((await response.json()).message || 'Chyba při přidávání aktuality');

      const data = await response.json();
      setSuccessMessage('Aktualita byla úspěšně přidána');
      onAdd(data);

      // Reset formuláře
      setHeadline('');
      setText('');
      setCategory('INFO');
      setLineup('');
      setDate('');
      setSelectedFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      setError(error.message || 'Nastala chyba');
    }
  };


  return (
    <div className="add-aktualita-container">
      <h2 className='editation-header'>Přidat novou aktualitu</h2>
      
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
          </label>
        </div>

        <div>
          <label>
            Text:
            <textarea
              placeholder="Výplň článku"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
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

        <button className='potvrditpridani' type="submit">Potvrdit přidání</button>
      </form>
      </div>
    </div>
  );
};

export default AddAktualita;