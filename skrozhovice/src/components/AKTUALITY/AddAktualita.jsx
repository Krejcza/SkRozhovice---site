import React, { useState } from 'react';

const AddAktualita = ({ onAdd }) => {
  const [headline, setHeadline] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('INFO'); 
  const [lineup, setLineup] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Format for date input
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccessMessage(''); 

    const aktualitaData = {
      date: new Date(date).toISOString(), // Ensure date is in ISO format
      headline,
      image: image || "", // Set image to the provided value or an empty string
      text,
      category,
      lineup,
    };

    console.log('Submitting data:', aktualitaData);

    try {
      const response = await fetch('http://localhost:5000/api/aktuality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(aktualitaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add aktualita');
      }

      const data = await response.json();
      console.log('Successfully added aktualita:', data);
      setSuccessMessage('Aktualita added successfully!');
      onAdd(data);
      // Clear the form fields
      setHeadline('');
      setText('');
      setCategory('INFO');
      setLineup('');
      setDate(new Date().toISOString().slice(0, 10)); // Reset date to current date
      setImage(""); // Clear image field
    } catch (error) {
      console.error('Error adding aktualita:', error);
      setError(error.message || 'An error occurred while adding aktualita');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Aktualita</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date} // Directly use formatted date
            onChange={(e) => setDate(e.target.value)} // Update date state
            required
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)} // Update image state
          />
        </label>
      </div>
      <button type="submit">Add Aktualita</button>
    </form>
  );
};

export default AddAktualita;
