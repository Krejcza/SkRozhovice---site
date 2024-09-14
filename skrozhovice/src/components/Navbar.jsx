import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import YouthDropdown from './YouthDropdown';
import { navItems } from './NavItems';
import './Navbar.css';
import beelogo from './images/BEE-logo.png';

const Navbar = () => {
   const [dropdown, setDropdown] = useState(false);
   const [youthDropdown, setYouthDropdown] = useState(false);

   return (
      <>
         <nav className='navbar'>
            <Link to='/' className='navbar-logo'>
               <img src={beelogo} alt='Bee Logo' className='bee-logo-nav' />
            </Link>
            <ul className='nav-items'>
               {navItems.map(item => {
                  if (item.title === 'Týmy dospělí') {
                     return (
                        <li key={item.id} className={item.cName} 
                            onMouseEnter={() => {
                                setDropdown(true);
                            }} 
                            onMouseLeave={() => {
                                setDropdown(false);
                            }}>
                           <Link to={item.path}>{item.title.toUpperCase()}</Link>
                           {dropdown && <Dropdown />}
                        </li>
                     );
                  }

                  if (item.title === 'Týmy mládež') {
                     return (
                        <li key={item.id} className={item.cName} 
                            onMouseEnter={() => {
                                setYouthDropdown(true);
                            }} 
                            onMouseLeave={() => {
                                setYouthDropdown(false);
                            }}>
                           <Link to={item.path}>{item.title.toUpperCase()}</Link>
                           {youthDropdown && <YouthDropdown />}
                        </li>
                     );
                  }

                  return (
                     <li key={item.id} className={item.cName}>
                        <Link to={item.path}>{item.title.toUpperCase()}</Link>
                     </li>
                  );
               })}
            </ul>
         </nav>
      </>
   );
};

export default Navbar;
