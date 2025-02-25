import OneButton from './OneButton';
import './ContactMain.css';
import OneTrainer from './OneTrainer';
import refpic from '../images/blank-profile-pic.webp'
import MapContact from './MapContact';
import SocialButton from './SocialButton';
import videoWebm from '../videos/fotbal-kontakt-webp.webm';
import videoMp4 from '../videos/fotbal-kontakt-mp4.mp4';
import thumbnail from '../images/thumbnail-kontakt.png'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';




// Hlavní komponenta na kontaktní stránku. Upravují se tady data tlačítek, sociálních sítía trenérů.


const ContactMain = () => {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
     phone: '723 739 151'
   },
   {
     image: refpic,
     name: 'Holub Martin',
     position: 'Asistent trenéra',
     phone: '776 020 468'
   },
   {
     image: refpic,
     name: 'Kopp Zdeněk',
     position: 'Asistent trenéra',
     phone: '602 464 595'
   },
   {
     image: refpic,
     name: 'Dušek Petr',
     position: 'Vedoucí týmu',
     phone: '723 024 430'
   },
 ];


 const trainersYoung = [
   {
     image: refpic,
     name: 'Voženílek Vlastimil',
     position: 'Trenér Ml. žáci',
     phone: '739 401 331'
   },
   {
     image: refpic,
     name: 'Uttendorský Jakub',
     position: 'Trenér St. přípravka',
     phone: '606 602 249'
   },
   {
     image: refpic,
     name: 'Denisa Žáková',
     position: 'Vedoucí přípravky',
     phone: '728 415 383'
   },
   {
     image: refpic,
     name: 'Uhlíř Jan',
     position: 'Trenér Dorost',
     phone: '733 192 667'
   },
   {
     image: refpic,
     name: 'Král Martin',
     position: 'Trenér St. žáci',
     phone: '774 912 913'
   },
   {
    image: refpic,
    name: 'Čopák Josef',
    position: 'Trenér Ml. přípravka',
    phone: '733 192 667'
  },
  {
    image: refpic,
    name: 'Janouch Jaroslav',
    position: 'Trenér Ml. přípravka',
    phone: '--- --- ---'
  }
   
 ];

 const { ref: socialRef, inView: socialInView } = useInView({
  triggerOnce: true, 
  threshold: 0.1,
});

const { ref: trainersRef, inView: trainersInView } = useInView({
  triggerOnce: true,
  threshold: 0.1, 
});


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
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
          >
            <OneTrainer
              key={index}
              image={trainer.image}
              name={trainer.name}
              position={trainer.position}
              phone={trainer.phone}
              isInverse={false}
            />
            </motion.div>
          ))}
          
         </div>
      </div>
      <div className="background-linear-deff">
        <h2 className='main-topic-small bl animation-of-tex'>Trenéři týmu mládež</h2>
        <div className="trainers-list">
          {trainersYoung.map((trainer, index) => (
            <motion.div
            key={index}
            ref={trainersRef}
            initial={{ opacity: 1, y: 50 }}
            animate={isDesktop && trainersInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
          >
              <OneTrainer
                key={index}
                image={trainer.image}
                name={trainer.name}
                position={trainer.position}
                phone={trainer.phone}
                isInverse={true}
              />
            </motion.div>
          ))}
        </div>
      </div>


      <div className="background-yellow wyc" >
         <h2 className='main-topic-small bl'>Kde nás najdete?</h2>
         <MapContact />
      </div>
      <div className="background-linear-deff mappp">
      <h2 className='main-topic-small bl'>Kde nás můžete sledovat?</h2>
        <div className="button-group diff">
          {socials.map((social, index) => (
            <motion.div
              key={index}
              className='social-btns'
              ref={socialRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: socialInView ? 1 : 0, y: socialInView ? 0 : 50 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
            >
              <SocialButton key={index} label={social.label} url={social.url} />
            </motion.div>
          ))}
        </div>

         <div className="video-playing">
          <p className='denis-speach'>Své by k tomu řekl i stálice rozhovického kádru Denis Dvořák.</p>
          <video 
            playsInline 
            controls
            className="video-background"
            poster={thumbnail}
            muted
            preload="auto"
            disableRemotePlayback
          >
            <source src={videoMp4} type="video/mp4" />
            <source src={videoWebm} type="video/webm" />
            Tvé zařízení nepodporuje přehrávání videa.
          </video>
         </div>

      </div>
    </>
  );
};

export default ContactMain;
