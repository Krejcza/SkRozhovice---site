import React, {useState} from 'react';
import { youthDropdown } from './NavItems';
import { Link } from 'react-router-dom';
import './Dropdown.css';


// Dropdown na hlavním menu, který cílí na Týmy mládež. Bere si data z NavItems, kde se dají měnit stránky/odkazy

const YouthDropdown = () => {
   const [dropdown, setDropdown] = useState(false);

   return (
      <ul className={dropdown ? 'dropdown-youth clicked' : 'dropdown-youth'} onClick={() => setDropdown(!dropdown)}>
         {youthDropdown.map(item => (
            <li key={item.id}>
               <Link className={item.cName} to={item.path} onClick={() => setDropdown(false)}>
                  {item.title}
               </Link>
            </li>
         ))}
      </ul>
   );
};

export default YouthDropdown;
