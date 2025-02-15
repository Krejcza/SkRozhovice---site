import { useState, useEffect } from 'react';
import './EditModalPlayer.css'
import { jwtDecode } from 'jwt-decode';

// Editace hráče - jeho kartičky v modálním okně

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


  // ověření uživatele
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        setIsLoggedIn(decodedToken.exp > currentTime);
      } catch (error) {
        console.error('Chyba získávání tokenu:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlayers();
    }
  }, [isLoggedIn]);


  // načítání hráčů
  const fetchPlayers = async () => {
    try {
      const response = await fetch('https://backend-rozhovice.onrender.com/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Chyba načítání hráčů:', error);
    }
  };

  // vybrání konkrétního hráče
  const handleSelectPlayer = (playerId) => {
    if (!playerId) {
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
      return;
    }
  
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  // funkce na updatování hráče
  const handleUpdatePlayer = async () => {
    try {
      const response = await fetch(`https://backend-rozhovice.onrender.com/api/players/${selectedPlayer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Hráč byl úspěšně aktualizován!');
        fetchPlayers();
      } else {
        alert('Chyba při upravování hráče');
      }
    } catch (error) {
      console.error('Chyba při upravování hráče:', error);
    }
  };


  return (
    isLoggedIn ? (
      <div className='edit-player-wrapper'>
      <div className="edit-player-container">
        <h2>Změnit údaje hráče</h2>
        
        <select
          className="select-player"
          onChange={(e) => handleSelectPlayer(e.target.value)}
          value={selectedPlayer?._id || ''}
        >
          <option value="">--Vyber hráče--</option>
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
  
        {selectedPlayer && (
          <div className="edit-player-form">
            <h3>Upravit údaje u: {selectedPlayer.name}</h3>
            <label>
              Rok narození:
              <input
                type="number"
                name="birthyear"
                value={formData.birthyear}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Výška (cm):
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Váha (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              V klubu od roku:
              <input
                type="number"
                name="clubyear"
                value={formData.clubyear}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Počet piv před odpadnutím:
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
            
            <div className="button-group-editing">
              <button
                className="button button-save"
                onClick={handleUpdatePlayer}
              >
                Potvrdit změny
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    ) : null
  );
}
export default EditModalPlayer;
