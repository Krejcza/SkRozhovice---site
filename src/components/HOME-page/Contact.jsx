import React from 'react';
import './Contact.css';
import blankPic from '../images/blank-profile-pic.webp';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="background-black">
      <h2 className="main-topic-small">Vedení klubu</h2>
      <div className="contact-container" ref={ref}>
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: inView ? 0 : -50, opacity: inView ? 1 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 25,
              delay: index * 0.15 
            }}
          >
            <div className="contact-card">
              <img src={contact.photo} alt={contact.name} className="contact-photo" />
              <div className="contact-name">{contact.name}</div>
              <div className="contact-position">{contact.position}</div>
              <div className="contact-phone">{contact.phone}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
