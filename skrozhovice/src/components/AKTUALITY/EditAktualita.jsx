import React, { useState, useEffect } from 'react';
import './AktualityMain.css';

const EditAktualita = ({ aktualita, onUpdate }) => {
  const [headline, setHeadline] = useState(aktualita.headline);
  const [text, setText] = useState(aktualita.text);
  const [category, setCategory] = useState(aktualita.category);
  const [lineup, setLineup] = useState(aktualita.lineup);
  const [date, setDate] = useState(aktualita.date.split('T')[0]); // Format date to 'YYYY-MM-DD'
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

    try {
      let imagePath = aktualita.image; // Keep existing image if no new file is uploaded
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const uploadResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadResponse.json();
        imagePath = uploadData.imagePath;
      }

      const formattedDate = new Date(date).toISOString();
      const updatedAktualita = {
        ...aktualita,
        date: formattedDate,
        headline,
        image: imagePath,
        text,
        category,
        lineup,
      };

      const response = await fetch(`http://localhost:5000/api/aktuality/${aktualita._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedAktualita),
      });

      if (!response.ok) {
        throw new Error('Failed to update aktualita');
      }

      const data = await response.json();
      setSuccessMessage('Aktualita updated successfully!');
      onUpdate(data); // Callback to update the state in AktualityMain

    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    setHeadline(aktualita.headline);
    setText(aktualita.text);
    setCategory(aktualita.category);
    setLineup(aktualita.lineup);
    setDate(aktualita.date.split('T')[0]); // Format date to 'YYYY-MM-DD'
  }, [aktualita]);

  return (
    <div className="edit-aktualita-container">
      <h2>Edit Aktualita</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
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
            Headline:
            <input
              type="text"
              placeholder="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
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
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="INFO">INFO</option>
              <option value="ZÁPAS">ZÁPAS</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Lineup:
            <input
              type="text"
              placeholder="Lineup"
              value={lineup}
              onChange={(e) => setLineup(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Update Aktualita</button>
      </form>
    </div>
  );
};

export default EditAktualita;
