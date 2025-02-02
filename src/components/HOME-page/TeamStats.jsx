import React, { useState, useEffect, useRef} from 'react';
import './TeamStats.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faGripLinesVertical, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-minimal.css';
import { useNavigate } from 'react-router-dom';

const TeamStats = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const statsRef = useRef(null);

  const navigate = useNavigate();
  
  const TEAM_NAME = "SK Rozhovice";
  const API_URL = "https://backend-rozhovice.onrender.com/api/matches";

  useEffect(() => {
   const fetchMatches = async () => {
     try {
       const response = await fetch(API_URL);
       const data = await response.json();
       setMatches(data);
     } catch (error) {
       console.error("Chyba při načítání dat:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchMatches();
 }, []);

 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        setTimeout(() => {
          setShowStats(true);
        }, 500);
        observer.disconnect();
      }
    },
    { threshold: 0.05 }
  );

  if (statsRef.current) {
    observer.observe(statsRef.current);
  }

  return () => {
    if (statsRef.current) {
      observer.unobserve(statsRef.current);
    }
  };
}, [loading]);

 const calculateStats = () => {
   let wins = 0;
   let losses = 0;
   let draws = 0;

   matches.forEach(match => {
      // Přeskočit zápasy bez skóre
      if (!match.score || match.score === "") {
        return;
      }

      const [homeScore, awayScore] = match.score.split(':').map(Number);
      
      // Kontrola, zda jsou čísla validní
      if (isNaN(homeScore) || isNaN(awayScore)) {
        return;
      }

      if (homeScore === awayScore) {
        draws++;
      } else if (match.teamDomaci === TEAM_NAME) {
        homeScore > awayScore ? wins++ : losses++;
      } else {
        awayScore > homeScore ? wins++ : losses++;
      }
    });

   if (loading) {
      return <div>Načítání...</div>;
    }

   return { wins, losses, draws };
 };


  const stats = calculateStats();

  const handleRedirect = () => {
    navigate('/Ateam#tablematchref');
  };

  return (
    <div className='stats-wrap' ref={statsRef}>
      <div className='stats-only'>
        <h3>ODEHRANÉ ZÁPASY</h3>
        <div className="stats-of-games">
          <div className='stats-loss'>
            <div className='first-stat'>
              <Odometer value={showStats ? stats.losses : 0} duration={1000} />
            </div>
            <div className='second-stat'>Prohry</div>
            <span className="icon loss-icon">
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <div className='return-of-the-jedi' onClick={handleRedirect}>
              <FontAwesomeIcon icon={faTurnUp} className='icon-to-matches' />
            </div>
          </div>
          <div className='stats-win'>
            <div className='first-stat'>
              <Odometer value={showStats ? stats.wins : 0} duration={1000} />
            </div>
            <div className='second-stat'>Výhry</div>
            <span className="icon win-icon">
              <FontAwesomeIcon icon={faCaretUp} />
            </span>
            <div className='return-of-the-jedi' onClick={handleRedirect}>
              <FontAwesomeIcon icon={faTurnUp} className='icon-to-matches' />
            </div>
          </div>
          <div className='stats-draw'>
            <div className='first-stat'>
              <Odometer value={showStats ? stats.draws : 0} duration={1000} />
            </div>
            <div className='second-stat'>Remízy</div>
            <span className="icon draw-icon">
              <FontAwesomeIcon icon={faGripLinesVertical} />
            </span>
            <div className='return-of-the-jedi' onClick={handleRedirect}>
              <FontAwesomeIcon icon={faTurnUp} className='icon-to-matches' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;