import React from 'react'
import './Contact.css'
import blankPic from '../images/blank-profile-pic.webp'


const contacts = [
   {
     id: 1,
     name: 'Stejskal Milan',
     position: 'Předseda',
     phone: '602 741 200',
     photo: blankPic
   },
   {
     id: 2,
     name: 'Ježek Robert',
     position: 'Místopředseda',
     phone: '606 620 230',
     photo: blankPic
   },
   {
     id: 3,
     name: 'Zykudová Soňa',
     position: 'Hlavní Ekonomka',
     phone: '',
     photo: blankPic
   },
   {
     id: 4,
     name: 'Valenta Radek',
     position: 'Sekretář klubu',
     phone: '721 029 700',
     photo: blankPic
   }
 ];

const Contact = () => {
  return (
   <div className='background-black'>
      <h2 className='main-topic-small'>Vedení klubu</h2>
      <div className="contact-container">
      {contacts.map(contact => (
        <div key={contact.id} className="contact-card">
          <img src={contact.photo} alt={contact.name} className="contact-photo" />
          <div className="contact-name">{contact.name}</div>
          <div className="contact-position">{contact.position}</div>
          <div className="contact-phone">{contact.phone}</div>
        </div>
         ))}
      </div>
   </div>
  )
}

export default Contact
