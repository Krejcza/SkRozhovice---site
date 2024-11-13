import React from 'react'
import { Link } from 'react-router-dom';
import footerLogo from './images/foter.png';
import skrozLogo from './images/rozhovice-club-logo.png';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
   return (
      <footer className='footer'>
         <div className='footer-container'>
            <img src={footerLogo} alt='Bee Logo' className='footer-logo' />
            <img src={skrozLogo} alt='Bee Logo' className='footer-logo-two' />
            <div className='socials-logos'>
               <a href='https://www.instagram.com/skrozhovice' target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={faInstagram} />
               </a>
               <a href='https://www.facebook.com/skrozhovice/' target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={faSquareFacebook} />
               </a>
            </div>
            <ul className='footer-links'>
               <li>
                  <Link to='/Aktuality'>Aktuality</Link>
               </li>
               <li>
                  <Link to='/TymyDospeli'>Týmy dospělí</Link>
               </li>
               <li>
                  <Link to='/TymyMladez'>Týmy mládež</Link>
               </li>
               <li>
                  <Link to='/OKlubu'>O klubu</Link>
               </li>
               <li>
                  <Link to='/Kontakt'>Kontakt</Link>
               </li>
               <li>
                  <Link to='/LoginUser'>Pro členy</Link>
               </li>
            </ul>
         </div>
         <div className='footer-underline'></div>
         <div className='footer-copyright'>
            Made by Lukáš Krejčí / Copyright SK Rozhovice {new Date().getFullYear()} &copy;
         </div>
      </footer>
   );
};

export default Footer;