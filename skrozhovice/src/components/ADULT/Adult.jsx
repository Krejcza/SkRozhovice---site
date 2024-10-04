import React from 'react'
import { Link } from 'react-router-dom';
import blankpic from '../images/blank-profile-pic.webp';
import './Adult.css'

const Adult = () => {


  return (
    <>
      <div className='main-banner-ep'>
        <h1>TÝMY DOSPĚLÍ</h1>
      </div>
      <div className="background-linear-deff mappp">
        <div className="section-pickme">
          <Link to="/Ateam" className="pickme-both">
            <img src={blankpic} alt="BEE Logo" />
            <h2>A-tým</h2>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Adult
