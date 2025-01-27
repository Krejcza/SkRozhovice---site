import React, { useEffect, useState } from 'react';
import './MatchesTable.css';
import { jwtDecode } from 'jwt-decode';

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newMatch, setNewMatch] = useState({
    round: '',
    date: '',
    kickoffTime: '',
    teamDomaci: '',
    teamHoste: '',
    score: ''
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
      const updatedData = { ...editMatch };
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
              <input
                type="text"
                placeholder="Kolo"
                value={newMatch.round}
                onChange={(e) => setNewMatch({ ...newMatch, round: e.target.value })}
              />
              <input
                type="date"
                placeholder="Datum"
                value={newMatch.date ? newMatch.date.split('T')[0] : ''}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
              />
              <input
                type="time"
                placeholder="Čas Výkopu"
                value={newMatch.kickoffTime}
                onChange={(e) => setNewMatch({ ...newMatch, kickoffTime: e.target.value })}
              />
              <input
                type="text"
                placeholder="Domácí tým"
                value={newMatch.teamDomaci}
                onChange={(e) => setNewMatch({ ...newMatch, teamDomaci: e.target.value })}
              />
              <input
                type="text"
                placeholder="Hostující tým"
                value={newMatch.teamHoste}
                onChange={(e) => setNewMatch({ ...newMatch, teamHoste: e.target.value })}
              />
              <input
                type="text"
                placeholder="Skóre"
                value={newMatch.score}
                onChange={(e) => setNewMatch({ ...newMatch, score: e.target.value })}
              />
              <button onClick={handleAddMatch}>Přidat zápas</button>
            </div>
          )}

          {editMatch && (
            <div className="edit-match-form">
              <h3>Upravit zápas - Kolo {editMatch.round}</h3>
              <input
                type="date"
                name="date"
                value={editMatch.date ? editMatch.date.split('T')[0] : ''}
                onChange={handleEditInputChange}
              />
              <input
                type="time"
                name="kickoffTime"
                value={editMatch.kickoffTime}
                onChange={handleEditInputChange}
              />
              <input
                type="text"
                name="teamDomaci"
                value={editMatch.teamDomaci}
                onChange={handleEditInputChange}
              />
              <input
                type="text"
                name="teamHoste"
                value={editMatch.teamHoste}
                onChange={handleEditInputChange}
              />
              <input
                type="text"
                name="score"
                value={editMatch.score}
                onChange={handleEditInputChange}
              />
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