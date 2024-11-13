import React, { useEffect, useState } from 'react';
import './MatchesTable.css';
import { jwtDecode } from 'jwt-decode';

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newMatch, setNewMatch] = useState({
    round: '',
    date: '',
    kickoffTime: '',
    teamDomaci: '',
    teamHoste: '',
    score: ''
  });
  const [editMatch, setEditMatch] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
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

    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/matches');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Sort matches by round number
        setMatches(data.sort((a, b) => a.round - b.round));
      } catch (error) {
        console.error('Error fetching matches:', error.message);
      }
    };

    fetchMatches();
  }, []);

  // Function to add a new match
  const handleAddMatch = async () => {
    try {
      console.log('Adding match with data:', newMatch);
      const response = await fetch('http://localhost:5000/api/matches', {
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
        console.error('Error adding match:', await response.text());
      }
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  // Function to handle editing a match
  const handleEditMatchSubmit = async () => {
    if (editMatch) {
      const updatedData = { ...editMatch };
      try {
        const response = await fetch(`http://localhost:5000/api/matches/${editMatch._id}`, {
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
          console.error('Error updating match');
        }
      } catch (error) {
        console.error('Error updating match:', error);
      }
    }
  };

  // Function to delete a match
  const handleDeleteMatch = async (id) => {
    const confirmDelete = window.confirm('Opravdu chcete smazat tento zápas?');
  
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/matches/${id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.ok) {
          setMatches((prevMatches) => prevMatches.filter(match => match._id !== id));
        } else {
          console.error('Error deleting match');
        }
      } catch (error) {
        console.error('Error deleting match:', error);
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  // Function to handle input changes in the edit form
  const handleEditInputChange = (e) => {
    setEditMatch({
      ...editMatch,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="matches-table">
      <h2 className='main-topic-small'>Seznam Zápasů</h2>
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
              <td>{match.teamDomaci} || {match.teamHoste}</td>
              <td>{match.score}</td>
              {isLoggedIn && (
                <td>
                  <button onClick={() => {
                    setEditMatch({ ...match });
                  }}>Editovat</button>
                  <button onClick={() => handleDeleteMatch(match._id)}>Smazat</button>
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
    </div>
  );
};

export default MatchesTable;
