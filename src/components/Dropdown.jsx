import React from 'react'
import { useState } from 'react'
import { oldDropdown } from './NavItems'
import { Link } from 'react-router-dom'
import './Dropdown.css'

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
