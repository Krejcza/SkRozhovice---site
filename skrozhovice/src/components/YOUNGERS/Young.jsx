import React from 'react'
import { Link } from 'react-router-dom';
import blankpic from '../images/blank-profile-pic.webp';
import './Young.css'



const Young = () => {
  return (
    <>
      <div className='main-banner-ep'>
        <h1>TÝMY MLÁDEŽ</h1>
      </div>
      <div className="background-linear-deff mappp">
        <div className="section-pickme-all">
          <div className="section-pickme-all-backgr">
            <Link to="/MladsiPriprava" className="pickme-both">
              <img src={blankpic} alt="Mladší přípravka" />
              <h2>Mladší přípravka</h2>
            </Link>
            <Link to="/StarsiPriprava" className="pickme-both">
              <img src={blankpic} alt="Starší přípravka" />
              <h2>Starší přípravka</h2>
            </Link>
            <Link to="/MladsiZaci" className="pickme-both">
              <img src={blankpic} alt="Mladší žáci" />
              <h2>Mladší žáci</h2>
            </Link>
            <Link to="/StarsiZaci" className="pickme-both">
              <img src={blankpic} alt="Starší žáci" />
              <h2>Starší žáci</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Young
