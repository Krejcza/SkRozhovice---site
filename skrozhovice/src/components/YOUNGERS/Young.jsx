import React from 'react'
import { Link } from 'react-router-dom';
import blankpic from '../images/blank-profile-pic.webp';
import './Young.css'

const teams = [
  { path: '/Mladsi-priprava', name: 'Mladší přípravka' },
  { path: '/Starsipriprava', name: 'Starší přípravka' },
  { path: '/Mladsi-zaci', name: 'Mladší žáci' },
  { path: '/Starsizaci', name: 'Starší žáci' }
];

const Young = () => {
  return (
    <>
      <div className='main-banner-ep'>
        <h1>TÝMY MLÁDEŽ</h1>
      </div>
      <div className="background-linear-deff mappp">
        <div className="section-pickme">
          {teams.map((team, index) => (
            <Link key={index} to={team.path} className="pickme-both">
              <img src={blankpic} alt={team.name} />
              <h2>{team.name.toUpperCase()}</h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Young
