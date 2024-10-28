import React, { useState } from 'react';
import './AktualityMain.css';

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

    try {
        let imagePath = "/uploads/default.webp"; 
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            console.log('Attempting to upload file:', selectedFile.name);

            try {
                const uploadResponse = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData,
                });

                const responseText = await uploadResponse.text();
                console.log('Raw upload response:', responseText);

                if (!uploadResponse.ok) {
                    try {
                        const errorData = JSON.parse(responseText);
                        throw new Error(errorData.message || 'Failed to upload image');
                    } catch (parseError) {
                        throw new Error('Server error: ' + responseText);
                    }
                }

                try {
                    const uploadData = JSON.parse(responseText);
                    imagePath = uploadData.imagePath;
                    console.log('Upload successful, image path:', imagePath);
                } catch (parseError) {
                    throw new Error('Invalid server response format');
                }
            } catch (uploadError) {
                console.error('Upload error:', uploadError);
                throw new Error(`File upload failed: ${uploadError.message}`);
            }
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

        console.log('Submitting aktualita data:', aktualitaData);

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
        
        // Reset form
        setHeadline('');
        setText('');
        setCategory('INFO');
        setLineup('');
        setDate('');
        setSelectedFile(null);
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An error occurred');
    }
};

  return (
    <div className="add-aktualita-container">
      <h2>Add New Aktualita</h2>
      
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

        <button type="submit">Add Aktualita</button>
      </form>
    </div>
  );
};

export default AddAktualita;