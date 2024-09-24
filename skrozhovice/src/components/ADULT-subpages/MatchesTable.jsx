import React, { useEffect, useState } from 'react';
import './MatchesTable.css';

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/matches');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched matches:', data);
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error.message);
      }
    };

    fetchMatches();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{match.round}</td>
              <td>{new Date(match.date).toLocaleDateString()}</td>
              <td>{match.kickoffTime}</td>
              <td>{match.teamDomaci} vs {match.teamHoste}</td>
              <td>{match.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesTable;
