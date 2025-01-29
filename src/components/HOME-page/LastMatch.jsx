import React, { useState, useEffect } from 'react';
import './LastMatch.css';
import defaultSoccerImg from '../images/players/defaultsoccer.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TeamStats from './TeamStats';

const LastMatch = () => {
  const [lastMatch, setLastMatch] = useState(null);
  const [upcomingMatch, setUpcomingMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);

  useEffect(() => {
   const fetchData = async () => {
     try {
       setIsLoading(true);
       const [matchesResponse, playersResponse] = await Promise.all([
        fetch('https://backend-rozhovice.onrender.com/api/matches'),
        fetch('https://backend-rozhovice.onrender.com/api/players')
      ]);

      if (!matchesResponse.ok || !playersResponse.ok) {
        throw new Error('Síťová odpověď nebyla v pořádku');
      }

      const [matchesData, playersData] = await Promise.all([
        matchesResponse.json(),
        playersResponse.json()
      ]);

      setPlayers(playersData);

      const now = new Date();
 
       // Minulé zápasy: datum < aktuální čas nebo existuje skóre
       const pastMatches = matchesData
         .filter(
           (item) =>
             item.date && 
             (new Date(item.date) < now || (item.score && item.score.trim() !== ""))
         )
         .sort((a, b) => new Date(b.date) - new Date(a.date)); // Nejnovější první
 
       // Budoucí zápasy: datum >= aktuální čas a skóre je prázdné
       const futureMatches = matchesData
         .filter(
           (item) =>
             item.date && 
             new Date(item.date) >= now && 
             (!item.score || item.score.trim() === "")
         )
         .sort((a, b) => new Date(a.date) - new Date(b.date)); // Nejbližší první
 
 
         if (pastMatches.length > 0) {
          setLastMatch(pastMatches[0]);
          if (pastMatches[0].mvpPlayer) {
            loadPlayerImage(pastMatches[0].mvpPlayer);
          }
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
 
   fetchData();
 }, []);

 const loadPlayerImage = async (playerName) => {
  try {
    const playerImageModule = await import(`../images/players/${playerName}.png`)
      .catch(() => ({ default: defaultSoccerImg }));
    setPlayerImage(playerImageModule.default);
  } catch (error) {
    console.error('Error loading player image:', error);
    setPlayerImage(defaultSoccerImg);
  }
};


 const getMvpPlayer = () => {
  if (!lastMatch?.mvpPlayer || !players) return null;
  return players.find(player => player.name === lastMatch.mvpPlayer);
};


  const mvpPlayer = getMvpPlayer();

  return (
    <>
      <div className="background-linear-deff">
        <h2 className='main-topic-small bl'>Rychlý přehled</h2>
        
        {isLoading && (
          <div className="loader-container-main">
            <div className="loader-main">
              <div className="spinner-main two"></div>
              <p className='wait-a-minute'>Načítání včelí statistiky. Prosíme o strpení.</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>Nepodařilo se načíst zápasy: {error}</p>
          </div>
        )}
        
        {!lastMatch && !upcomingMatch && !isLoading && (
          <p>Žádné zápasy nebyly nalezeny.</p>
        )}
        
        {!isLoading && (
          <div className="every-section-matcher">
            <div className="both-matches">
              {lastMatch && (
                <div className="last-match">
                  <div className="match-details">
                    <div className="first-part-matcher">
                      <p className="last-matchos-p">Poslední odehraný zápas:</p>
                      <div className="two-machter-timer">
                        <div className='matcher-dates'>
                          <p className='matcher-dates-two'>
                            {new Date(lastMatch.date).toLocaleDateString('cs-CZ', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="timer-dates">
                          <p className='timer-dates-two'>od {lastMatch.kickoffTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="second-part-matcher">
                      <div className="match-teams">
                        <span className="team-home">{lastMatch.teamDomaci}</span>
                        <span className="match-score">{lastMatch.score}</span>
                        <span className="team-away">{lastMatch.teamHoste}</span>
                      </div>
                      <div className="match-read-btn">
                        <div className="mvp-svgs">
                          <FontAwesomeIcon icon={faAnglesRight} className='svg-mvp' />
                        </div>
                        <Link to="/Aktuality">
                          <button>Hodnocení zápasu</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
  
              {upcomingMatch && (
                <div className="upcoming-match">
                  <div className="match-details-up">
                    <div className="first-part-matcher">
                      <p className="up-matchos-p">Nadcházející zápas:</p>
                      <div className="two-machter-timer">
                        <div className='upmatcher-dates'>
                          <p className='upmatcher-dates-two'>
                            {new Date(upcomingMatch.date).toLocaleDateString('cs-CZ', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="uptimer-dates">
                          <p className='uptimer-dates-two'>od {upcomingMatch.kickoffTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="second-uppart-matcher">
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
              <div className="mvp-player-inside-wr">
                <div className="mvp-player">
                  <div className="name-of-mvp-wrapper">
                    <p className="name-of-mvp">
                      {mvpPlayer ? mvpPlayer.name : "Nejlepší hráč"}
                    </p>
                  </div>
                  <h2 className='mvp-of-mvp'>MVP</h2>
                  <div className="img-of-mvp-wrapper">
                    <img 
                      className='img-of-mvp' 
                      src={playerImage || defaultSoccerImg} 
                      alt="Player" 
                    />
                  </div>
                  <div className="mvp-match-res">
                    <div className="mvp-match-res-wrap">
                      <p className='mvp-of-domaci'>
                        {lastMatch?.teamDomaci || "Domácí tým"}
                      </p>
                      <p className='mvp-of-score'>
                        {lastMatch?.score || "VS"}
                      </p>
                      <p className='mvp-of-hoste'>
                        {lastMatch?.teamHoste || "Hostující tým"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!isLoading && (
        <TeamStats />
        )}
      </div>
    </>
  );
}
export default LastMatch;
