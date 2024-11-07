import { useState, useEffect } from 'react';
import './EditModalPlayer.css'
import { jwtDecode } from 'jwt-decode';

const EditModalPlayer = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    birthyear: '',
    height: '',
    weight: '',
    clubyear: '',
    beercount: '',
    instagram: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        setIsLoggedIn(decodedToken.exp > currentTime);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlayers();
    }
  }, [isLoggedIn]);

  // Fetch all players from the backend
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleSelectPlayer = (playerId) => {
    const player = players.find((p) => p._id === playerId);
    setSelectedPlayer(player);
    setFormData({
      name: player.name,
      birthyear: player.birthyear,
      height: player.height,
      weight: player.weight,
      clubyear: player.clubyear,
      beercount: player.beercount,
      instagram: player.instagram
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdatePlayer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/players/${selectedPlayer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Player updated successfully!');
        fetchPlayers();
      } else {
        alert('Failed to update player');
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const handleDeletePlayer = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedPlayer.name}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/players/${selectedPlayer._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          alert('Player deleted successfully!');
          setSelectedPlayer(null);
          setFormData({
            name: '',
            birthyear: '',
            height: '',
            weight: '',
            clubyear: '',
            beercount: '',
            instagram: ''
          });
          fetchPlayers();
        } else {
          alert('Failed to delete player');
        }
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };


  return (
    isLoggedIn ? (
      <div className="edit-player-container">
        <h2>Edit Player</h2>
        
        <select
          className="select-player"
          onChange={(e) => handleSelectPlayer(e.target.value)}
          value={selectedPlayer?._id || ''}
        >
          <option value="">Select a player</option>
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
  
        {selectedPlayer && (
          <div className="edit-player-form">
            <h3>Edit Details for {selectedPlayer.name}</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Birth Year:
              <input
                type="number"
                name="birthyear"
                value={formData.birthyear}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Height (cm):
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Club Year:
              <input
                type="number"
                name="clubyear"
                value={formData.clubyear}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Beer Count:
              <input
                type="number"
                name="beercount"
                value={formData.beercount}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Instagram:
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            
            <div className="button-group">
              <button
                className="button button-save"
                onClick={handleUpdatePlayer}
              >
                Update Player
              </button>
              <button
                className="button button-delete"
                onClick={handleDeletePlayer}
              >
                Delete Player
              </button>
            </div>
          </div>
        )}
      </div>
    ) : null
  );
}
export default EditModalPlayer;
