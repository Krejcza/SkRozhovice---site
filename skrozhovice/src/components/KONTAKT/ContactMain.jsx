import OneButton from './OneButton';
import './ContactMain.css';
import OneTrainer from './OneTrainer';
import refpic from '../images/blank-profile-pic.webp'
import MapContact from './MapContact';
import SocialButton from './SocialButton';
import videoBg from '../videos/dg.mp4';
import React, { useEffect, useState } from 'react';
import Lines from '../images/lines.png'
import BackgroundImageLines from '../BackgroundImageLines';


const ContactMain = () => {

  // Data jsou správná

  const buttonData = [
    { label: 'Adresa', contactInfo: ['SK Rozhovice', 'Rozhovice 90', '538 03 Rozhovice'] },
    { label: 'Telefon', contactInfo: ['Sekretář klubu', 'Valenta Radek', '+420 721 029 700'] },
    { label: 'Email', contactInfo: ['skrozhovice@seznam.cz'] },
  ];

  const socials = [
   { label: 'Facebook', url: 'https://www.facebook.com/skrozhovice/' },
   { label: 'Instagram', url: 'https://www.instagram.com/skrozhovice' }
 ];

  const trainers = [
   {
     image: refpic,
     name: 'Stejskal David',
     position: 'Hlavní trenér',
     phone: '+420 723 739 151'
   },
   {
     image: refpic,
     name: 'Holub Martin',
     position: 'Asistent trenéra',
     phone: '+420 776 020 468'
   },
   {
     image: refpic,
     name: 'Kopp Zdeněk',
     position: 'Asistent trenéra',
     phone: '+420 602 464 595'
   },
   {
     image: refpic,
     name: 'Dušek Petr',
     position: 'Vedoucí týmu',
     phone: '+420 723 024 430'
   },
 ];


 const trainersYoung = [
   {
     image: refpic,
     name: 'Volejník Martin',
     position: 'Trenér Ml. žáci',
     phone: '+420 606 602 249'
   },
   {
     image: refpic,
     name: 'Utterdorfský Jakub',
     position: 'Trenér St. přípravka',
     phone: '+420 606 602 249'
   },
   {
     image: refpic,
     name: 'Stejskal David',
     position: 'Trenér Ml. přípravka',
     phone: '+420 723 739 151'
   },
   {
     image: refpic,
     name: 'Denisa Žáková',
     position: 'Hlavní vedoucí přípravky',
     phone: '+420 728 415 383'
   },
   {
     image: refpic,
     name: 'Uhlíř Jan',
     position: 'Trenér Dorost',
     phone: '+420 733 192 667'
   },
   {
     image: refpic,
     name: 'Tomčík Michal',
     position: 'Trenér St. žáci',
     phone: '+420 775 869 281'
   }
 ];


 const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='main-banner-ep'>
        <h1>KONTAKT</h1>
      </div>
      <div className="background-linear-deff">
      <BackgroundImageLines offsetY={offsetY} />
         <div className="button-group">
         {buttonData.map((data, index) => (
            <OneButton key={index} label={data.label} contactInfo={data.contactInfo} />
         ))}
         </div>
      </div>
      <div className="background-black nb">
         <h2 className='main-topic-small'>Trenéři týmu dospělí</h2>
         <div className="trainers-list">
          {trainers.map((trainer, index) => (
            <OneTrainer
              key={index}
              image={trainer.image}
              name={trainer.name}
              position={trainer.position}
              phone={trainer.phone}
              isInverse={false}
            />
          ))}
         </div>
      </div>
      <div className="background-linear-deff">
      <BackgroundImageLines offsetY={offsetY} />
         <h2 className='main-topic-small bl'>Trenéři týmu mládež</h2>
         <div className="trainers-list">
          {trainersYoung.map((trainer, index) => (
            <OneTrainer
              key={index}
              image={trainer.image}
              name={trainer.name}
              position={trainer.position}
              phone={trainer.phone}
              isInverse={true}
            />
          ))}
         </div>
      </div>
      <div className="background-yellow wyc" >
         <h2 className='main-topic-small bl'>Kde nás najdete?</h2>
         <MapContact />
      </div>
      <div className="background-linear-deff mappp">
      <BackgroundImageLines offsetY={offsetY} />
         <h2 className='main-topic-small bl'>Kde nás můžete sledovat?</h2>
         <div className="button-group diff">
         {socials.map((social, index) => (
            <SocialButton key={index} label={social.label} url={social.url} />
         ))}
         </div>
         <div className="video-playing">
            <video 
            src={videoBg} 
            controls 
            className="video-background"
            ></video>
         </div>
      </div>
    </>
  );
};

export default ContactMain;
