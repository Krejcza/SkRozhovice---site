import {useState} from 'react';
import './MainPageOld.css';
import fifacard from '../images/fifa-card.png';
import MatchesTable from './MatchesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import refpic from '../images/blank-profile-pic.webp'
import onePlayer from '../images/onePlayer.png'


const MainPageOld = () => {

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const goalkeepers = [
    { name: 'Barva Michal', image: fifacard, },
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


const fetchPlayerDetails = async (name) => {
  try {
    const response = await fetch(`http://localhost:5000/api/player/${name}`);
    
    if (!response.ok) {
     
      setSelectedPlayer({
        name: "Neznámý hráč",
        birthyear: "N/A",
        height: "N/A",
        weight: "N/A",
        clubyear: "N/A",
        beercount: "N/A",
        image: fifacard 
      });
      setModalVisible(true);
      return;
    }

    const data = await response.json();
    setSelectedPlayer(data);
    setModalVisible(true);

  } catch (error) {
    console.error('Error fetching player details:', error);
    
    setSelectedPlayer({
      name: "Neznámý hráč",
      birthyear: "N/A",
      height: "N/A",
      weight: "N/A",
      clubyear: "N/A",
      beercount: "N/A",
      image: fifacard 
    });
    setModalVisible(true);
  }
};


const getPlayerImage = (playerName) => {
  try {
    return require(`../images/players/${playerName}.png`);
  } catch (err) {
    return onePlayer;
  }
};

  return (
    <>
      <div className='main-banner-ep'>
        <h1>A-TÝM</h1>
      </div>
      <div className="background-linear-deff">
        <h2 className="main-topic-small bl">Soupiska</h2>

        <div className="positions-fifa">
          <h3>Brankáři</h3>
        </div>
        <div className="fifa-cards">
          {goalkeepers.map((player, index) => (
            <div key={index} className="fifa-card">
              <img src={player.image} alt={player.name} onClick={() => fetchPlayerDetails(player.name)} />
              <p>{player.name}</p>
            </div>
          ))}
        </div>

        <div className="positions-fifa">
          <h3>Obránci</h3>
        </div>
        <div className="fifa-cards">
          {defenders.map((player, index) => (
            <div key={index} className="fifa-card">
              <img src={player.image} alt={player.name} onClick={() => fetchPlayerDetails(player.name)} />
              <p>{player.name}</p>
            </div>
          ))}
        </div>

        <div className="positions-fifa">
          <h3>Záložníci</h3>
        </div>
        <div className="fifa-cards">
          {midfielders.map((player, index) => (
            <div key={index} className="fifa-card">
              <img src={player.image} alt={player.name} onClick={() => fetchPlayerDetails(player.name)} />
              <p>{player.name}</p>
            </div>
          ))}
        </div>

        <div className="positions-fifa">
          <h3>Útočníci</h3>
        </div>
        <div className="fifa-cards">
          {attackers.map((player, index) => (
            <div key={index} className="fifa-card">
              <img src={player.image} alt={player.name} onClick={() => fetchPlayerDetails(player.name)} />
              <p>{player.name}</p>
            </div>
          ))}
        </div>
      </div>

        <div className="background-black nb">
          <MatchesTable />
          <div className="actual-score">
            <FontAwesomeIcon icon={faChevronRight} className='icon-chev icon-chev-right' />
            <a href="https://www.fotbal.cz/souteze/turnaje/table/3754394e-7ec1-4d2d-93f9-443e9621e358" target="_blank">
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

        {modalVisible && selectedPlayer && (
  <div className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={() => setModalVisible(false)}>&times;</span>

      {loading && <div className="loading-spinner">Načítání...</div>}

      <img
        src={getPlayerImage(selectedPlayer.name)}
        alt={selectedPlayer.name}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />

      {!loading && (
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
            <p>{selectedPlayer.height} cm</p>
          </div>
          <div className="one-modal-pl">
            <h5>Váha:</h5>
            <p>{selectedPlayer.weight} kg</p>
          </div>
          <div className="one-modal-pl">
            <h5>V klubu od roku:</h5>
            <p>{selectedPlayer.clubyear}</p>
          </div>
          <div className="one-modal-pl">
            <h5>Počet piv před kolapsem:</h5>
            <p>{selectedPlayer.beercount}</p>
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
