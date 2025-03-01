import React, { useState, useEffect } from 'react';
import MatchesTable from './MatchesTable';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import refpic from '../images/blank-profile-pic.webp'
import EditModalPlayer from './EditModalPlayer'
import { useSpring, animated } from "react-spring";
import AnimatedText from './AnimatedText';
import './MainPageOld.css'
import barva from '../images/CARDS/Barva.png'
import kudlacek from '../images/CARDS/Kudláček.png'
import bednarz from '../images/CARDS/Bednarz.png'
import dvorak from '../images/CARDS/Dvořák.png'
import fedor from '../images/CARDS/Fedor.png'
import holecek from '../images/CARDS/Holeček.png'
import holub from '../images/CARDS/Holub.png'
import holubml from '../images/CARDS/Holubml.png'
import holy from '../images/CARDS/Holý.png'
import kopp from '../images/CARDS/Kopp.png'
import kostinec from '../images/CARDS/Kostinec.png'
import malek from '../images/CARDS/Málek.png'
import mudrunka from '../images/CARDS/Mudruňka.png'
import novak from '../images/CARDS/Novák.png'
import pekar from '../images/CARDS/Pekař.png'
import pleskot from '../images/CARDS/Pleskot.png'
import backovsky from '../images/CARDS/Bačkovský.png'
import serhii from '../images/CARDS/Shrhii.png'
import stejskal from '../images/CARDS/Stejskal.png'
import vasko from '../images/CARDS/Vaško.png'
import vozenilek from '../images/CARDS/Voženílek.png'
import zalud from '../images/CARDS/Žalud.png'


const goalkeepers = [
   { name: 'Barva Michal', image: barva },
   { name: 'Kudláček Lukáš', image: kudlacek },
   { name: 'Pleskot Matěj', image: pleskot },
   { name: 'Málek Patrik', image: malek },
 ];

 const defenders = [
   { name: 'Pieies Sehrhii', image: serhii },
   { name: 'Vaško Jakub', image: vasko },
   { name: 'Fedor Viacheslav', image: fedor },
   { name: 'Dvořák Denis', image: dvorak },
 ];

 const midfielders = [
   { name: 'Holub Martin', image: holub },
   { name: 'Mudruňka Josef', image: mudrunka },
   { name: 'Kopp Zdeněk', image: kopp },
   { name: 'Bačkovský Petr', image: backovsky },
   { name: 'Stejskal David', image: stejskal },
   { name: 'Holeček Filip', image: holecek },
   { name: 'Pekař Jiří', image: pekar },
   { name: 'Novák Filip', image: novak },
   { name: 'Kostinec Jakub', image: kostinec },
   { name: 'Holub Marek', image: holubml },
 ];

 const attackers = [
   { name: 'Voženílek Jakub', image: vozenilek },
   { name: 'Žalud Daniel', image: zalud },
   { name: 'Holý Jakub', image: holy },
 ];

 const realizeTeam = [
   {
     image: refpic,
     name: 'Stejskal David',
     position: 'Hlavní trenér',
     phone: '723 739 151'
   },
   {
     image: refpic,
     name: 'Holub Martin',
     position: 'Asistent trenéra',
     phone: '776 020 468'
   },
   {
     image: refpic,
     name: 'Kopp Zdeněk',
     position: 'Asistent trenéra',
     phone: '602 464 595'
   },
   {
     image: refpic,
     name: 'Dušek Petr',
     position: 'Vedoucí týmu',
     phone: '723 024 430'
   },
 ];

 const PlayerCard = ({ player }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [playerDetails, setPlayerDetails] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [hoveredPlayer, setHoveredPlayer] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);


   useEffect(() => {
      if (playerDetails) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    }, [playerDetails]);

   useEffect(() => {
      const preventScroll = (e) => {
        if (isModalOpen) {
          e.preventDefault();
        }
      };
  
      if (isModalOpen) {
        window.addEventListener('wheel', preventScroll, { passive: false });
      }
  
      return () => {
        window.removeEventListener('wheel', preventScroll);
      };
    }, [isModalOpen]);
 
   const handleCardClick = async () => {
     setIsModalOpen(true);
     setIsLoading(true);
     setError(null);
 
     try {
       const response = await fetch(`https://backend-rozhovice.onrender.com/api/players/name/${encodeURIComponent(player.name)}`);
       if (!response.ok) {
         throw new Error('Failed to fetch player details');
       }
       const data = await response.json();
       console.log(data);
       setPlayerDetails(data);
     } catch (err) {
       console.error('Error fetching player details:', err);
       setError('Failed to load player details');
     } finally {
       setIsLoading(false);
     }
   };
 
    const closeModal = () => {
      setIsModalOpen(false);
    };

    

   const defaultImage = 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1739381097/Players/f1ehgluri6panxntonxs.png';

   const getImageUrl = (imageUrl) => {
      return imageUrl || defaultImage;
   };

     // Animace karty
  const [props, api] = useSpring(() => ({
   xys: [0, 0, 1],
   config: { mass: 10, tension: 600, friction: 60 },
 }));

 const trans = (x, y, s) => 
   `perspective(750px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

 const calc = (x, y, rect) => {
   const BUFFER = 50;
   const centerX = rect.left + rect.width / 2;
   const centerY = rect.top + rect.height / 2;
   
   const ex = ((x - centerX) / BUFFER) * 1.5;
   const why = (-(y - centerY) / BUFFER) * 1.5;
   
   return [why, ex, 1.15];
 };
   
    const modalContent = isModalOpen && (
     <div className="modal" onClick={closeModal}>
      <div className="modal-wrapper-one">
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
         <span onClick={closeModal} className="close-button">
           ×
         </span>

         {isLoading ? (
          <div className="loader-container-main-player">
            <div className="loader-main-player">
              <div className="spinner-name-player"></div>
              <p className='loader-name-text'>Načítání hráče. Prosíme o strpení.</p>
            </div>
          </div>
         ) : error ? (
           <div className="error-text">{error}</div>
         ) : playerDetails ? (
           <div className={`modal-inside-content ${isLoaded ? 'loaded' : ''}`}>
             <img
               src={getImageUrl(playerDetails.cloudinaryImage)}
               alt={playerDetails.name || 'Player profile'}
               className="modal-content-img"
             />
             <div className="modal-info-pl">
               <AnimatedText text={playerDetails.name} />
               <div className="all-modals-pl">
                 <div className="one-modal-pl">
                   <h5>Rok narození:</h5>
                   <p>{playerDetails.birthyear}</p>
                 </div>
                 <div className="one-modal-pl">
                   <h5>Výška:</h5>
                   <p>{playerDetails.height} cm</p>
                 </div>
                 <div className="one-modal-pl">
                   <h5>Váha:</h5>
                   <p>{playerDetails.weight} kg</p>
                 </div>
                 <div className="one-modal-pl">
                   <h5>V klubu od roku:</h5>
                   <p>{playerDetails.clubyear}</p>
                 </div>
                 <div className="one-modal-pl">
                   <h5>Počet piv před vypnutím:</h5>
                   <p>{playerDetails.beercount}</p>
                 </div>
               </div>
               {playerDetails.instagram && (
                  <div className="one-modal-pl instagram-btn">
                    <p>
                      <a
                        href={playerDetails.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-link"
                      >
                        <FontAwesomeIcon icon={faInstagram}/>
                        <span className="instagram-text"></span>
                      </a>
                    </p>
                  </div>
                )}
             </div>
           </div>
         ) : null}
       </div>
      </div>
     </div>
   );

   const location = useLocation();

   useEffect(() => {
    if (location.hash === '#tablematchref') {
      const timeout = setTimeout(() => {
        const element = document.getElementById('tablematchref');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400); 

      return () => clearTimeout(timeout);
    }
  }, [location]);
   
   return (
     <>
       <div className="fifa-card-wrapper" onClick={handleCardClick}>
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
             if (hoveredPlayer === player.name) {
               api.start({ xys: [0, 0, 1] });
             }
           }}
           onMouseEnter={() => {
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
           <img
             src={getImageUrl(player.image)}
             alt={player.name}
             className='one-and-only-image'
           />
         </animated.div>
         <p className="name-of-player-fifa">{player.name}</p>
       </div>
 
       {/* Vykreslení modalu pomocí portalu */}
       {isModalOpen && ReactDOM.createPortal(
         modalContent,
         document.body
       )}
     </>
   );
};

  const PlayerSection = ({ title, players }) => (
   <div className="player-section">
      <div className="positions-fifa">
         <h3>{title}</h3>
      </div>
         <div className="fifa-cards">
            {players.map((player, index) => (
               <PlayerCard 
               key={index} 
               player={player} 
               />
            ))}
         </div>
   </div>
 );
 

 const NewMainPageOld = () => {
   return (
     <div>
       <div className='main-banner-ep'>
         <h1>A-TÝM</h1>
       </div>
 
       <div className="background-linear-deff">
       <h2 className="main-topic-small bl">Soupiska</h2>
           <PlayerSection 
             title="Brankáři" 
             players={goalkeepers} 
           />
           <PlayerSection 
             title="Obránci" 
             players={defenders} 
           />
           <PlayerSection 
             title="Záložníci" 
             players={midfielders} 
           />
           <PlayerSection 
             title="Útočníci" 
             players={attackers} 
           />
         
         <EditModalPlayer/>
       </div>
 
       <div id='tablematchref' className="background-black nb">
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
     </div>

     
   )
 }
export default NewMainPageOld
