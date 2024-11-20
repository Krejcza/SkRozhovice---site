import React from 'react'
import { Link } from 'react-router-dom';
import MladsiPripravkaPic from '../images/mladsi_pripravka.jpg';
import StarsiPripravkaPic from '../images/starsi_pripravka.jpg';
import MladsiZaciPic from '../images/mladsi_zaci.jpg';
import StarsiZaciPic from '../images/starsi_zaci.jpg';
import DorostPic from '../images/dorost.jpg';
import './Young.css'
import { motion } from 'framer-motion';

// Komponenta, která vrací Týmy mládež, které si uživatel může zvolit a přesměruje ho to na detailný stránky

const teamData = [
  { path: '/MladsiPriprava', img: MladsiPripravkaPic, title: 'Mladší přípravka' },
  { path: '/StarsiPriprava', img: StarsiPripravkaPic, title: 'Starší přípravka' },
  { path: '/MladsiZaci', img: MladsiZaciPic, title: 'Mladší žáci' },
  { path: '/StarsiZaci', img: StarsiZaciPic, title: 'Starší žáci' },
  { path: '/Dorost', img: DorostPic, title: 'Dorost' },
];


const Young = () => {
  return (
    <>
      <div className="main-banner-ep">
        <h1>TÝMY MLÁDEŽ</h1>
      </div>
      <div className="background-linear-deff mappp">
        <div className="section-pickme-all">
          <div className="section-pickme-all-backgr">
            {teamData.map((team, index) => (
              <motion.div
                key={index}
                className="pickme-animation"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1, 
                }}
              >
                <Link to={team.path} className="pickme-both">
                  <img src={team.img} alt={team.title} />
                  <h2>{team.title}</h2>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Young
