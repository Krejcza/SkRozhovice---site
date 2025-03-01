import React, { useEffect, useState } from 'react';
import './MatchesTable.css';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimesCircle, faEquals } from "@fortawesome/free-solid-svg-icons";



const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [newMatch, setNewMatch] = useState({
    round: '',
    date: '',
    kickoffTime: '',
    teamDomaci: '',
    teamHoste: '',
    score: '',
    mvpPlayer: ''
  });
  const [editMatch, setEditMatch] = useState(null);

  // ověří se jestli je uživatel přihlášený
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        setIsLoggedIn(decodedToken.exp > currentTime);
      } catch (error) {
        console.error('Chyba dekódování tokenu:', error);
      }
    }

    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://backend-rozhovice.onrender.com/api/players');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Chyba načítání hráčů:', error.message);
      }
    };

    fetchPlayers();

    // Načtení zápasů z api
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-rozhovice.onrender.com/api/matches');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        //srování zápasů podle kola
        setMatches(data.sort((a, b) => a.round - b.round));
      } catch (error) {
        console.error('Chyba načítání zápasů:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Funkce na přidání nového zápasu
  const handleAddMatch = async () => {
    try {
      const response = await fetch('https://backend-rozhovice.onrender.com/api/matches', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newMatch),
      });
  
      if (response.ok) {
        const addedMatch = await response.json();
        setMatches((prevMatches) => [...prevMatches, addedMatch]);
        setNewMatch({ round: '', date: '', kickoffTime: '', teamDomaci: '', teamHoste: '', score: '' });
      } else {
        console.error('Chyba při přidání zápasu:', await response.text());
      }
    } catch (error) {
      console.error('Chyba při přidání zápasu:', error);
    }
  };

  // Funkce na editaci zápasů
  const handleEditMatchSubmit = async () => {
    if (editMatch) {
      const updatedData = {
        ...editMatch,
        mvpPlayer: editMatch.mvpPlayer || ''
      };
      try {
        const response = await fetch(`https://backend-rozhovice.onrender.com/api/matches/${editMatch._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          const updatedMatch = await response.json();
          setMatches((prevMatches) =>
            prevMatches.map((match) => (match._id === updatedMatch._id ? updatedMatch : match))
          );
          setEditMatch(null);
        } else {
          console.error('Chyba upravování zápasů');
        }
      } catch (error) {
        console.error('Chyba upravování zápasů:', error);
      }
    }
  };

  // Function to delete a match
  const handleDeleteMatch = async (id) => {
    const confirmDelete = window.confirm('Opravdu chcete smazat tento zápas?');
  
    if (confirmDelete) {
      try {
        const response = await fetch(`https://backend-rozhovice.onrender.com/api/matches/${id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.ok) {
          setMatches((prevMatches) => prevMatches.filter(match => match._id !== id));
        } else {
          console.error('Chyba mazání zápasu');
        }
      } catch (error) {
        console.error('Chyba mazání zápasu:', error);
      }
    } else {
      console.log('Smazání zápasu přerušeno.');
    }
  };

  // funkce na změny co napíše uživatel
  const handleEditInputChange = (e) => {
    setEditMatch({
      ...editMatch,
      [e.target.name]: e.target.value
    });
  };

  const getMatchResult = (match) => {
    if (!match.score || !match.teamDomaci || !match.teamHoste) return '';
  
    const scores = match.score.match(/\d+/g);
    if (!scores || scores.length < 2) return '';
  
    const [domaciScore, hosteScore] = scores.map(Number);
  
    // Zjistíme, zda je SK Rozhovice domácí tým
    const isRozhoviceHome = match.teamDomaci === "SK Rozhovice";
  
    if (isRozhoviceHome) {
      if (domaciScore > hosteScore) return 'WIN';
      if (domaciScore < hosteScore) return 'LOST';
    } else {
      if (hosteScore > domaciScore) return 'WIN';
      if (hosteScore < domaciScore) return 'LOST';
    }
  
    return 'EVEN';
  };
  
  

  return (
    <div className="matches-table">
      <h2 className='main-topic-small'>Seznam Zápasů</h2>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-table"></div>
          <p>Načítáme zápasy. Prosíme o strpení.</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Kolo</th>
                <th>Datum</th>
                <th>Čas Výkopu</th>
                <th>Zápas</th>
                <th>Skóre</th>
                <th>Výsledek</th> 
                {isLoggedIn && <th>Akce</th>}
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id}>
                  <td>{match.round}</td>
                  <td>{match.date ? new Date(match.date).toLocaleDateString() : ''}</td>
                  <td>{match.kickoffTime}</td>
                  <td>{match.teamDomaci} - {match.teamHoste}</td>
                  <td>{match.score}</td>
                  <td>
                    {getMatchResult(match) === "WIN" && <FontAwesomeIcon className='winner-mode' icon={faTrophy} />}
                    {getMatchResult(match) === "LOST" && <FontAwesomeIcon className='looser-mode' icon={faTimesCircle} />}
                    {getMatchResult(match) === "EVEN" && <FontAwesomeIcon className='even-mode' icon={faEquals} />}
                  </td>

                  {isLoggedIn && (
                    <td>
                      <div className='buttons-for-editation-match'>
                        <button className='editation-match-btn' onClick={() => {
                          setEditMatch({ ...match });
                        }}>Editovat</button>
                        <button className='deletion-match-btn' onClick={() => handleDeleteMatch(match._id)}>Smazat</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {isLoggedIn && (
            <div className="add-match-form">
              <h3>Přidat nový zápas</h3>
              <label htmlFor="round-mtch">Kolo:</label>
              <input
                id='round-mtch'
                type="text"
                placeholder="Kolo"
                value={newMatch.round}
                onChange={(e) => setNewMatch({ ...newMatch, round: e.target.value })}
              />
              <label htmlFor="date-mtch">Datum:</label>
              <input
                id='date-mtch'
                type="date"
                placeholder="Datum"
                value={newMatch.date ? newMatch.date.split('T')[0] : ''}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
              />
              <label htmlFor="time-mtch">Čas:</label>
              <input
                id='time-mtch'
                type="time"
                placeholder="Čas Výkopu"
                value={newMatch.kickoffTime}
                onChange={(e) => setNewMatch({ ...newMatch, kickoffTime: e.target.value })}
              />
              <label htmlFor="hometm-mtch">Tým domácí:</label>
              <input
                id='hometm-mtch'
                type="text"
                placeholder="Domácí tým"
                value={newMatch.teamDomaci}
                onChange={(e) => setNewMatch({ ...newMatch, teamDomaci: e.target.value })}
              />
              <label htmlFor="awaytm-mtch">Tým hosté:</label>
              <input
                id='awaytm-mtch'
                type="text"
                placeholder="Hostující tým"
                value={newMatch.teamHoste}
                onChange={(e) => setNewMatch({ ...newMatch, teamHoste: e.target.value })}
              />
              <label htmlFor="score-mtch">Skóre:</label>
              <input
                id='score-mtch'
                type="text"
                placeholder="Skóre"
                value={newMatch.score}
                onChange={(e) => setNewMatch({ ...newMatch, score: e.target.value })}
              />
              <label htmlFor="bestpl-mtch">Nejlepší hráč:</label>
              <select
                id='bestpl-mtch'
                className='vyber-hrace'
                value={newMatch.mvpPlayer}
                onChange={(e) => setNewMatch({ ...newMatch, mvpPlayer: e.target.value })}
              >
                <option value="">Vyber MVP zápasu</option>
                {players.map((player) => (
                  <option key={player._id} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
              <button onClick={handleAddMatch}>Přidat zápas</button>
            </div>
          )}

          {editMatch && (
            <div className="edit-match-form">
              <h3>Upravit zápas - Kolo {editMatch.round}</h3>
              <label htmlFor="date-mtch">Datum:</label>
              <input
                id='date-mtch'
                type="date"
                name="date"
                value={editMatch.date ? editMatch.date.split('T')[0] : ''}
                onChange={handleEditInputChange}
              />
              <label htmlFor="time-mtch">Čas:</label>
              <input
                id='time-mtch'
                type="time"
                name="kickoffTime"
                value={editMatch.kickoffTime}
                onChange={handleEditInputChange}
              />
              <label htmlFor="hometm-mtch">Tým domácí:</label>
              <input
                id='hometm-mtch'
                type="text"
                name="teamDomaci"
                value={editMatch.teamDomaci}
                onChange={handleEditInputChange}
                placeholder="Domácí tým"
              />
              <label htmlFor="awaytm-mtch">Tým hosté:</label>
              <input
                id='awaytm-mtch'
                type="text"
                name="teamHoste"
                value={editMatch.teamHoste}
                onChange={handleEditInputChange}
                placeholder="Hostující tým"
              />
              <label htmlFor="score-mtch">Skóre:</label>
              <input
                id='score-mtch'
                type="text"
                name="score"
                value={editMatch.score}
                onChange={handleEditInputChange}
                placeholder="Skóre"
              />
              <label htmlFor="bestpl-mtch">Nejlepší hráč:</label>
                <select
                  id='bestpl-mtch'
                  name="mvpPlayer"
                  value={editMatch.mvpPlayer || ''} // Toto už máme
                  onChange={handleEditInputChange}
                  className='vyber-hrace'
                >
                  <option value="">Vyber MVP zápasu</option>
                  {players.map((player) => (
                    <option 
                      key={player._id} 
                      value={player.name}
                      defaultValue={editMatch.mvpPlayer === player.name} // Přidáme selected pro aktuální MVP
                    >
                      {player.name}
                    </option>
                  ))}
                </select>
              <button onClick={handleEditMatchSubmit}>Uložit změny</button>
              <button onClick={() => setEditMatch(null)}>Zrušit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MatchesTable;