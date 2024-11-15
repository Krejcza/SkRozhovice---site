import React from 'react'
import { Link } from 'react-router-dom';
import MladsiPripravkaPic from '../images/mladsi_pripravka.jpg';
import StarsiPripravkaPic from '../images/starsi_pripravka.jpg';
import MladsiZaciPic from '../images/mladsi_zaci.jpg';
import StarsiZaciPic from '../images/starsi_zaci.jpg';
import DorostPic from '../images/dorost.jpg';
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
              <img src={MladsiPripravkaPic} alt="Mladší přípravka" />
              <h2>Mladší přípravka</h2>
            </Link>
            <Link to="/StarsiPriprava" className="pickme-both">
              <img src={StarsiPripravkaPic} alt="Starší přípravka" />
              <h2>Starší přípravka</h2>
            </Link>
            <Link to="/MladsiZaci" className="pickme-both">
              <img src={MladsiZaciPic} alt="Mladší žáci" />
              <h2>Mladší žáci</h2>
            </Link>
            <Link to="/StarsiZaci" className="pickme-both">
              <img src={StarsiZaciPic} alt="Starší žáci" />
              <h2>Starší žáci</h2>
            </Link>
            <Link to="/Dorost" className="pickme-both">
              <img src={DorostPic} alt="Dorost" />
              <h2>Dorost</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Young
