import React from 'react';
import { Link } from 'react-router-dom';
import ateamphoto from '../images/a-team-photo.webp';
import './Adult.css';
import { motion } from 'framer-motion';

// Komponenta týmů dospělých, kdy je možné přidat další týmy

const Adult = () => {
  return (
    <>
      <div className="main-banner-ep">
        <h1>TÝMY DOSPĚLÍ</h1>
      </div>
      <div className="background-linear-deff mappp">
        <div className="section-pickme">
          <motion.div
            className="pickme-animation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Link to="/Ateam" className="pickme-both">
              <img src={ateamphoto} alt="A-tým logo" />
              <h2>A-tým</h2>
            </Link>
          </motion.div>
        </div> 
      </div>
    </>
  );
};

export default Adult;
