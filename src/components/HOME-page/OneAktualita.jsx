import './Aktuality.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


// Komponenta jedné aktuality, která se ukazuje na hlavní stránce.

const OneAktualita = ({ date, headline, image, text }) => {
  
  const imageUrl = image && image !== '' 
    ? image 
    : 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1731591618/SkRozhovice/ooo6wxdqeuzyybxxcgbx.webp';

  return (
  <>
  <div className="aktualita-one-everithing">
    <div className='aktualita-about'>
      <h2>{headline}</h2>
    </div>
    <div className="aktualita-item">
      <div className="aktualita-and-about">
        <div className="aktualita-image-one">
          <img src={imageUrl} alt={headline} />
        </div>
        <div className="text-date-akt">
            <p className='only-text-date-akt'>{date}</p>
          </div>
       
      </div>
      <p className='text-text-akt'>{text}</p>
      <div className="aktualita-aktualita">
        {/* <Link to='/Aktuality'>Pokračovat ve čtení</Link> */}
        <div className="ref-to-aktualita">
          <Link to='/Aktuality'>
            <FontAwesomeIcon className='icon-to-full-akt' icon={faRightFromBracket} />
          </Link>
        </div>
      </div>
    </div>
    </div>
    
    </>
    );
};



export default OneAktualita