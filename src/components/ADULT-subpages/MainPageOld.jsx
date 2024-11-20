import React, { useState, useEffect } from 'react';
import './MainPageOld.css';
import fifacard from '../images/fifa-card.png';
import MatchesTable from './MatchesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import refpic from '../images/blank-profile-pic.webp'
import { getPlayerImage } from './PlayerImages';
import EditModalPlayer from './EditModalPlayer'
import { useSpring, animated } from "react-spring";

const MainPageOld = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [loadink, setLoadink] = useState(false);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [playersDetailz, setPlayersDetailz] = useState({});
  const [error, setError] = useState(null);

  const goalkeepers = [
    { name: 'Barva Michal', image: fifacard },
    { name: 'Kudláček Lukáš', image: fifacard },
    { name: 'Pleskot Matěj', image: fifacard },
    { name: 'Málek Patrik', image: fifacard },
  ];

  const defenders = [
    { name: 'Pieies Sehrhii', image: fifacard },
    { name: 'Vaško Jakub', image: fifacard },
    { name: 'Fedor Viacheslav', image: fifacard },
    { name: 'Dvořák Denis', image: fifacard },
    { name: 'Zhyhariev Mykola', image: fifacard },
  ];

  const midfielders = [
    { name: 'Holub Martin', image: fifacard },
    { name: 'Mudruňka Josef', image: fifacard },
    { name: 'Kopp Zdeněk', image: fifacard },
    { name: 'Bačkovský Petr', image: fifacard },
    { name: 'Stejskal David', image: fifacard },
    { name: 'Holeček Filip', image: fifacard },
    { name: 'Pekař Jiří', image: fifacard },
    { name: 'Novák Filip', image: fifacard },
    { name: 'Kostinec Jakub', image: fifacard },
    { name: 'Holub Marek', image: fifacard },
  ];

  const attackers = [
    { name: 'Bednarz Jakub', image: fifacard },
    { name: 'Voženílek Jakub', image: fifacard },
    { name: 'Žalud Daniel', image: fifacard },
    { name: 'Zhyhariev Oleksandr', image: fifacard },
    { name: 'Holý Jakub', image: fifacard }
  ];

  const realizeTeam = [
    {
      image: refpic,
      name: 'Stejskal David',
      position: 'Hlavní trenér',
      phone: '+420 723 739 151'
    },
    {
      image: refpic,
      name: 'Holub Martin',
      position: 'Asistent trenéra',
      phone: '+420 776 020 468'
    },
    {
      image: refpic,
      name: 'Kopp Zdeněk',
      position: 'Asistent trenéra',
      phone: '+420 602 464 595'
    },
    {
      image: refpic,
      name: 'Dušek Petr',
      position: 'Vedoucí týmu',
      phone: '+420 723 024 430'
    },
  ];

  // Hromadné načtení všech hráčů na začátku
  useEffect(() => {
    const allPlayers = [
      ...goalkeepers.map(p => p.name),
      ...defenders.map(p => p.name),
      ...midfielders.map(p => p.name),
      ...attackers.map(p => p.name)
    ];
  
    console.log('Seznam všech hráčů:', allPlayers);
    console.log('Počet hráčů:', allPlayers.length);
  
    const fetchAllPlayerDetails = async () => {
      const startTime = Date.now(); 
      const detailsMap = {};

      
      for (const playerName of allPlayers) {
        console.log('ahoj', playerName);
        try {
          const encodedName = encodeURIComponent(playerName);
          const response = await fetch(`http://localhost:5000/api/players/name/${encodedName}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          detailsMap[playerName] = data;
        } catch (error) {
          console.error(`Chyba při načítání hráče ${playerName}:`, error);
          detailsMap[playerName] = {
            name: playerName,
            birthyear: "N/A",
            height: "N/A",
            weight: "N/A",
            clubyear: "N/A",
            beercount: "N/A",
            instagram: "N/A"
          };
        }
      }
      setPlayersDetailz(detailsMap);
  
      const endTime = Date.now();
      console.log(`Načítání všech hráčů trvalo: ${endTime - startTime}ms`);
    };
  
    fetchAllPlayerDetails();
  }, []);



  const fetchPlayerDetails =(playerName) => {
    console.log(`Fetching details for: ${playerName}`);
    if (playersDetailz[playerName]) {
      setSelectedPlayer(playersDetailz[playerName]);
      setModalVisibles(true);
      setLoadink(false);
    } else {
      setSelectedPlayer({
        name: playerName,
        birthyear: "N/A",
        height: "N/A",
        weight: "N/A",
        clubyear: "N/A",
        beercount: "N/A",
        instagram: "N/A"
      });
      setModalVisibles(true);
      setLoadink(false);
    }
  };

  // Zavření modálního okna
  const handleModalClose = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-button')) {
      setModalVisibles(false);
      setSelectedPlayer(null);
      setError(null);
    }
  };

  // Animace karty
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 400, friction: 30 },
  }));

  const trans = (x, y, s) => 
    `perspective(750px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const calc = (x, y, rect) => {
    const BUFFER = 50;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const ex = (x - centerX) / BUFFER;
    const why = -(y - centerY) / BUFFER;
    
    return [why, ex, 1.025];
  };




  const PlayerSection = ({ title, players }) => {
    return (
      <>
        <div className="positions-fifa">
          <h3>{title}</h3>
        </div>

        <div className="fifa-cards">
          {players.map((player, index) => (
            <div className="fifa-card-wrapper" key={index}>
              <animated.div
                className="fifa-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const { clientX: x, clientY: y } = e;
                  
                  if (hoveredPlayer === player.name) {
                    api.start({ xys: calc(x, y, rect) });
                  }
                }}
                onMouseLeave={() => {
                  console.log("Mouse left: ", player.name);
                  if (hoveredPlayer === player.name) {
                    api.start({ xys: [0, 0, 1] });
                  }
                }}
                onMouseEnter={() => {
                  console.log("Hovering over: ", player.name);
                  setHoveredPlayer(player.name);
                }}
                style={{
                  transform: hoveredPlayer === player.name 
                    ? props.xys.to(trans) 
                    : undefined,
                  transition: "transform 0.1s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >

                {/* Dělá to tohle hovno */}
                <img
                  // src={player.image}
                  alt={player.name}
                  className='one-and-only-image'
                  onClick={() => {
                    fetchPlayerDetails(player.name);
                  }}
                />
              </animated.div>
              <p 
                className='name-of-player-fifa' 
                onClick={() => {
                  fetchPlayerDetails(player.name);
                }}
              >
                {player.name}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className='main-banner-ep'>
        <h1>A-TÝM</h1>
      </div>
      <div className="background-linear-deff">
        <h2 className="main-topic-small bl">Soupiska</h2>
        <PlayerSection title="Brankáři" players={goalkeepers} />
        <PlayerSection title="Obránci" players={defenders} />
        <PlayerSection title="Záložníci" players={midfielders} />
        <PlayerSection title="Útočníci" players={attackers} />
        <EditModalPlayer/>
      </div>

      <div className="background-black nb">
        <MatchesTable />
        <div className="actual-score">
          <FontAwesomeIcon icon={faChevronRight} className='icon-chev icon-chev-right' />
          <a href="https://www.fotbal.cz/souteze/turnaje/table/3754394e-7ec1-4d2d-93f9-443e9621e358" target="_blank" rel="noopener noreferrer">
            AKTUÁLNÍ TABULKA AGRO CS 1.A PARDUBICKÝ KRAJ
          </a>
          <FontAwesomeIcon icon={faChevronLeft} className='icon-chev icon-chev-left' />
        </div>
      </div>

      <div className="background-linear-deff mappp">
        <h2 className='main-topic-small bl'>Realizační tým</h2>
        <div className="trainers-list">
          {realizeTeam.map((oneMember, index) => (
            <div key={index} className='trainer-container'>
              <img src={oneMember.image} alt={oneMember.name} className="trainer-image"/>
              <div className="trainer-info">
                <h3 className='trainer-name inv'>{oneMember.name}</h3>
                <p className="trainer-position inv">{oneMember.position}</p>
                <p className='trainer-phone inv'>{oneMember.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalVisibles && selectedPlayer && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setModalVisibles(false)}>&times;</span>

            {loadink && <div className="loading-spinner">Načítání...</div>}

            <img
              src={getPlayerImage(selectedPlayer.imagePath)}
              alt={selectedPlayer.name}
              onLoad={() => setLoadink(false)}
              onError={() => setLoadink(false)}
              style={{ display: loadink ? 'none' : 'block' }}
              className='modal-content-img'
            />

            {!loadink && (
              <div className="modal-info-pl">
                <div className="one-modal-pl">
                  <h5>Jméno:</h5>
                  <p>{selectedPlayer.name}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Rok narození:</h5>
                  <p>{selectedPlayer.birthyear}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Výška:</h5>
                  <p>{selectedPlayer.height}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Váha:</h5>
                  <p>{selectedPlayer.weight}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Rok ve klubu:</h5>
                  <p>{selectedPlayer.clubyear}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Počet piv před kolapsem:</h5>
                  <p>{selectedPlayer.beercount}</p>
                </div>
                <div className="one-modal-pl">
                  <h5>Instagram:</h5>
                  <p><a href={selectedPlayer.instagram} target="_blank" rel="noopener noreferrer">Odkaz</a></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainPageOld;