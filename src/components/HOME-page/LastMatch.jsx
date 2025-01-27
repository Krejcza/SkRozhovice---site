import React, { useState, useEffect } from 'react';
import './LastMatch.css';

const LastMatch = () => {
  const [lastMatch, setLastMatch] = useState(null);
  const [upcomingMatch, setUpcomingMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   const fetchMatches = async () => {
     try {
       setIsLoading(true);
       const response = await fetch('https://backend-rozhovice.onrender.com/api/matches');
       if (!response.ok) {
         throw new Error('Síťová odpověď nebyla v pořádku');
       }
       const data = await response.json();
 
       const now = new Date();
 
       // Minulé zápasy: datum < aktuální čas nebo existuje skóre
       const pastMatches = data
         .filter(
           (item) =>
             item.date && 
             (new Date(item.date) < now || (item.score && item.score.trim() !== ""))
         )
         .sort((a, b) => new Date(b.date) - new Date(a.date)); // Nejnovější první
 
       // Budoucí zápasy: datum >= aktuální čas a skóre je prázdné
       const futureMatches = data
         .filter(
           (item) =>
             item.date && 
             new Date(item.date) >= now && 
             (!item.score || item.score.trim() === "")
         )
         .sort((a, b) => new Date(a.date) - new Date(b.date)); // Nejbližší první
 
 
       if (pastMatches.length > 0) {
         setLastMatch(pastMatches[0]);
       }
       if (futureMatches.length > 0) {
         setUpcomingMatch(futureMatches[0]);
       }
 
       setError(null);
     } catch (error) {
       console.error('Chyba při načítání zápasů:', error);
       setError(error.message);
     } finally {
       setIsLoading(false);
     }
   };
 
   fetchMatches();
 }, []);

  if (isLoading) {
    return (
      <div className="loader-container-main">
        <div className="loader-main">
          <p>Načítání zápasů. Prosíme o strpení.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Nepodařilo se načíst zápasy: {error}</p>
      </div>
    );
  }

  if (!lastMatch && !upcomingMatch) {
    return <p>Žádné zápasy nebyly nalezeny.</p>;
  }

  return (
    <>
    <div className="background-linear-deff">
    <div className="every-section-matcher">
      <div className="both-matches">
        {lastMatch && (
          <div className="last-match">
            <div className="match-details">
              <p className="last-matchos-p">Poslední odehraný zápas:</p>
              <div className="second-part-matcher">
                <div className='matcher-dates'>
                    <p className='matcher-dates-one'>
                      Datum:
                    </p>
                    <p className='matcher-dates-two'>
                      {' '}
                      {new Date(lastMatch.date).toLocaleDateString('cs-CZ', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}</p>
                </div>
                <div className="timer-dates">
                    <p className='timer-dates-one'>Čas výkopu: </p>
                    <p className='timer-dates-two'>{lastMatch.kickoffTime}</p>
                </div>
                <div className="match-teams">
                  <span className="team-home">{lastMatch.teamDomaci}</span>
                  <span className="match-score">{lastMatch.score}</span>
                  <span className="team-away">{lastMatch.teamHoste}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {upcomingMatch && (
          <div className="upcoming-match">
            <div className="match-details-up">
              <p className="up-matchos-p">Nadcházející zápas:</p>
              <div className="second-uppart-matcher">
                <div className='upmatcher-dates'>
                  <p className='upmatcher-dates-one'>
                    Datum:
                  </p>
                  <p className='upmatcher-dates-two'>
                  {' '}
                    {new Date(upcomingMatch.date).toLocaleDateString('cs-CZ', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="uptimer-dates">
                  <p className='uptimer-dates-one'>Čas výkopu: </p>
                  <p className='uptimer-dates-two'>{upcomingMatch.kickoffTime}</p>
                </div>
                <div className="match-teams">
                  <span className="team-home">{upcomingMatch.teamDomaci}</span>
                  <span className="match-score">VS</span>
                  <span className="team-away">{upcomingMatch.teamHoste}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        <div className="mvp-player-wrap">
          <div className="mvp-player">
            <p className="name-of-mvp"></p>
            <img src="" alt="" className="pic-of-mvp" />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default LastMatch;
