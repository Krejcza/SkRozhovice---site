import React, { useState } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const AddAktualita = ({ onAdd }) => {
  const [headline, setHeadline] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('INFO');
  const [lineup, setLineup] = useState('');
  const [date, setDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    let imagePath = "/uploads/default.webp";
    try {

      if (selectedFile) {
        const response = await fetch('http://localhost:5000/api/get-upload-url', { method: 'POST' });
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
            throw new Error(cloudinaryResult.message || 'Failed to upload image');
          }
        
        imagePath = cloudinaryResult.secure_url; 
      }
  
  

      const formattedDate = new Date(date).toISOString();
      const aktualitaData = {
        date: formattedDate,
        headline,
        image: imagePath, 
        text,
        category,
        lineup,
      };

      const response = await fetch('http://localhost:5000/api/aktuality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(aktualitaData),
      });

      if (!response.ok) throw new Error((await response.json()).message || 'Failed to add aktualita');

      const data = await response.json();
      setSuccessMessage('Aktualita added successfully!');
      onAdd(data);

      // Reset form
      setHeadline('');
      setText('');
      setCategory('INFO');
      setLineup('');
      setDate('');
      setSelectedFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };


  return (
    <div className="add-aktualita-container">
      <h2 className='editation-header'>Přidat novou aktualitu</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Datum:
            <input
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

        <button type="submit">Potvrdit přidání</button>
      </form>
    </div>
  );
};

export default AddAktualita;