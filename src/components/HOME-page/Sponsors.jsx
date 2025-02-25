import './Sponsors.css'
import '../../App.css'

import pardubice from '../images/Logos/pardubice.jpg'
import msmt from '../images/Logos/msmt.jpg'
import rozhovice from '../images/Logos/rozhovice.jpg'
import taurus from '../images/Logos/taurus.jpg'
import acp from '../images/Logos/acp.jpg'
import matejka from '../images/Logos/matejka.jpg'
import sting from '../images/Logos/sting.jpg'
import ritmo from '../images/Logos/ritmo.jpg'
import agrometal from '../images/Logos/agromettal.jpg'
import boco from '../images/Logos/boco.jpg' 
import pohorelec from '../images/Logos/pohorelec.jpg' 
import svyp from '../images/Logos/svyp.jpg' 
import duvox from '../images/Logos/duvox.jpg' 
import bylany from '../images/Logos/bylany.jpg' 
import agricola from '../images/Logos/agricola.jpg' 
import rinat from '../images/Logos/rinat.jpg' 
import jirout from '../images/Logos/jirout.jpg' 
import satjam from '../images/Logos/satjam.jpg' 
import cepi from '../images/Logos/cepi.jpg' 
import amako from '../images/Logos/amako.jpg' 
import sherlog from '../images/Logos/sherlog.jpg' 
import tzi from '../images/Logos/tzi.jpg' 
import restaurace from '../images/Logos/restaurace.jpg' 
import jezborice from '../images/Logos/jezborice.jpg' 
import dsv from '../images/Logos/dsv.jpg' 
import jpd from '../images/Logos/jpd.jpg' 
import hybes from '../images/Logos/hybes.jpg' 
import bauset from '../images/Logos/bauset.jpg' 
import grof from '../images/Logos/grof.jpg' 
import rigo from '../images/Logos/rigo.jpg' 
import maple from '../images/Logos/maple.jpg' 
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import spons1 from '../images/nnn.webp'
import spons2 from '../images/HHH.webp'

// Komponenta sponzorů, která vypíše jméno a ukáže logo sponzora. Kliknutím na odkaz se převede na stránku. Toto jsou jenom data.

const sponsors = [
   { id: 1, name: 'Pardubický kraj', logo: pardubice, url: 'https://www.pardubickykraj.cz/' },
   { id: 2, name: 'Ministerstvo školství, mládeže a tělovýchovy', logo: msmt, url: 'https://msmt.gov.cz/' },
   { id: 3, name: 'Obec Rozhovice', logo: rozhovice, url: 'https://www.rozhovice.cz/' },
   { id: 4, name: 'Taurus s.r.o.', logo: taurus, url: 'https://www.taurus-sro.cz/' },
   { id: 5, name: 'ACP Engineering s.r.o.', logo: acp, url: 'https://acpe.cz/' },
   { id: 6, name: 'Libor Matějka - autodoprava', logo: matejka, url: 'https://www.libormatejka.cz/' },
   { id: 7, name: 'RK Sting', logo: sting, url: 'https://www.rksting.cz/' },
   { id: 8, name: 'Autoservis Ritmo Bylany', logo: ritmo, url: 'https://www.autoservis-ritmo.cz/' },
   { id: 9, name: 'Agrometall', logo: agrometal, url: 'http://www.agrometall.cz/' },
   { id: 10, name: 'BOCO Pardubice', logo: boco, url: 'http://www.boco.cz/' },
   { id: 11, name: 'Kovo Pohorelec', logo: pohorelec, url: 'https://www.kovo-pohorelec.cz/' },
   { id: 12, name: 'SVYP CZ s.r.o.', logo: svyp, url: 'https://www.svyp.cz/' },
   { id: 13, name: 'DUVOX', logo: duvox, url: 'http://www.duvox.cz/' },
   { id: 14, name: 'OBEC Bylany', logo: bylany, url: 'https://www.bylany.cz/' },
   { id: 15, name: 'Družstvo Agricola Bylany', logo: agricola, url: 'https://www.druzstvoagricola.cz/' },
   { id: 16, name: 'Rinatsport.cz', logo: rinat, url: 'https://www.rinatsport.cz/' },
   { id: 17, name: 'Jirout reklamní agentura', logo: jirout, url: 'https://www.jirout.com/' },
   { id: 18, name: 'Satjam - lehká střecha s tradicí', logo: satjam, url: 'https://www.satjam.cz/' },
   { id: 19, name: 'OBEC Čepí', logo: cepi, url: 'https://www.cepi.cz/' },
   { id: 20, name: 'AMAKO', logo: amako, url: 'https://www.amako.cz' },
   { id: 21, name: 'Elcarmont s.r.o.', logo: sherlog, url: 'https://elcarmont.cz/' },
   { id: 22, name: 'TZI CZ s.r.o.', logo: tzi, url: 'https://www.facebook.com/people/TZI-CZ/100086461462974/?paipv=0&eav=AfaoIagJcCUzhed_F9vkLTY9zQ9BXehrAUCkN0QMKIwGGX4woqRp216ZFUMu-dQksYk&_rdr' },
   { id: 23, name: 'Rozhovická restaurace', logo: restaurace, url: 'https://www.ubytovani-rozhovice.cz/restaurace/' },
   { id: 24, name: 'DSV - Global transport and Logistics', logo: dsv, url: 'https://www.dsv.com/cs-cz/' },
   { id: 25, name: 'JPD Group s.r.o.', logo: jpd, url: 'https://www.jpdgroup.cz/cs' },
   { id: 26, name: 'Auto Hybeš.cz Dřenice', logo: hybes, url: 'https://www.autohybes.cz/' },
   { id: 27, name: 'Bauset CZ a.s.', logo: bauset, url: 'https://bauset.cz/' },
   { id: 28, name: 'GROF Autodoprava', logo: grof, url: 'https://www.firmy.cz/detail/684514-grof-novotny-nakladni-doprava-bylany.html' },
   { id: 29, name: 'RIGO Autodoprava', logo: rigo, url: 'https://autodoprava-kontakt.cz/pardubicky-kraj/josef-rigo-bylany' },
   { id: 30, name: 'Maple restaurant', logo: maple, url: 'https://maplerestaurant.webnode.cz/' },
   { id: 31, name: 'OBEC Jezbořice', logo: jezborice, url: 'https://jezborice.cz/' },
   
 ];

 const Sponsors = () => {

  // Animace sponzorů, kde když se ukážou na stránce, tak se mi seřadí v animaci přes framer

   const { ref, inView } = useInView({
      threshold: 0.05,
      triggerOnce: true, 
    });

    return (
      <div className="background-yellow">
        <h2 className="main-topic-small bl">Sponzoři</h2>
  
        <div className="sponsors-container" ref={ref}>
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: inView ? index * 0.05 : 0,
                duration: 0.8,
              }}
            >
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-logo"
                />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="pics-wrapper-with-h2-idk-hamburger">
          <h2 className="main-topic-small bl">Speciální poděkování</h2>
          <div className="spons-images-two">
            <img className='sponsor-image-oc jednaz' src={spons1} alt="" />
            <img className='sponsor-image-oc dvaz' src={spons2} alt="" />
          </div>
        </div>
      </div>
    );
  };

export default Sponsors
