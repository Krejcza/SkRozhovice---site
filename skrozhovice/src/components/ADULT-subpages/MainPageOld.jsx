import React from 'react';
import './MainPageOld.css';
import fifacard from '../images/fifa-card.png';

const MainPageOld = () => {

  const goalkeepers = [
    { name: 'Denis Dvořák', image: fifacard },
    { name: 'Jan Novák', image: fifacard },
    { name: 'Petr Čech', image: fifacard },
    { name: 'Lukáš Krejčí', image: fifacard },
  ];

  const defenders = [
   { name: 'Denis Dvořák', image: fifacard },
   { name: 'Jan Novák', image: fifacard },
   { name: 'Petr Čech', image: fifacard },
   { name: 'Lukáš Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
 ];

 const midfielders = [
   { name: 'Denis Dvořák', image: fifacard },
   { name: 'Jan Novák', image: fifacard },
   { name: 'Petr Čech', image: fifacard },
   { name: 'Lukáš Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard },
 ];


 const attackers = [
   { name: 'Denis Dvořák', image: fifacard },
   { name: 'Jan Novák', image: fifacard },
   { name: 'Petr Čech', image: fifacard },
   { name: 'Lukáš Krejčí', image: fifacard },
   { name: 'Jakub Krejčí', image: fifacard }
 ];

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
              <img src={player.image} alt={player.name} />
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
              <img src={player.image} alt={player.name} />
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
              <img src={player.image} alt={player.name} />
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
              <img src={player.image} alt={player.name} />
              <p>{player.name}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default MainPageOld;
