import React from 'react'
import { useState } from 'react'
import { oldDropdown } from './NavItems'
import { Link } from 'react-router-dom'
import './Dropdown.css'



// Dropdown na hlavním menu, který cílí na Týmy dospělí. Bere si data z NavItems, kde se dají měnit stránky/odkazy

const Dropdown = () => {

   const [dropdown, setDropdown] = useState(false)

  return (
    <>
      <ul className={dropdown ? 'old-submenu clicked' : 'old-submenu'} onClick={() => setDropdown(!dropdown)}>
         {oldDropdown.map(item =>{
            return(
               <li key={item.id}>
                  <Link className={item.cName} to={item.path} onClick={() => setDropdown(false)}>
                  {item.title}
                  </Link>
               </li>
            )
         })}
      </ul>
    </>
  )
}

export default Dropdown
