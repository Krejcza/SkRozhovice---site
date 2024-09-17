import React from 'react';
import OneButton from './OneButton';
import './ContactMain.css';
import OneTrainer from './OneTrainer';
import refpic from '../images/blank-profile-pic.webp'
import MapContact from './MapContact';
import SocialButton from './SocialButton';
import videoBg from '../videos/dg.mp4'

const ContactMain = () => {

  const buttonData = [
    { label: 'Adresa', contactInfo: ['SK Rozhovice', 'Rozhovice 90', '538 03 Rozhovice'] },
    { label: 'Telefon', contactInfo: ['+123456789'] },
    { label: 'Email', contactInfo: ['info@skrozhovice.cz'] },
  ];

  const socials = [
   { label: 'Facebook', url: 'https://www.facebook.com/skrozhovice/' },
   { label: 'Instagram', url: 'https://www.instagram.com/skrozhovice' }
 ];

  const trainers = [
   {
     image: refpic,
     name: 'Jan Novák',
     position: 'Hlavní trenér',
     phone: '+420 123 456 789'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
 ];


 const trainersYoung = [
   {
     image: refpic,
     name: 'Jan Novák',
     position: 'Hlavní trenér',
     phone: '+420 123 456 789'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   },
   {
     image: refpic,
     name: 'Petr Svoboda',
     position: 'Asistent trenéra',
     phone: '+420 987 654 321'
   }
 ];

  return (
    <>
      <div className='main-banner-ep'>
        <h1>KONTAKT</h1>
      </div>
      <div className="background-linear-deff">
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
      <div className="background-yellow wyc">
         <h2 className='main-topic-small bl'>Kde nás najdete?</h2>
         <MapContact />
      </div>
      <div className="background-linear-deff mappp">
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
