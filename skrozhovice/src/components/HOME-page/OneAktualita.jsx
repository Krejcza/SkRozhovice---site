import './Aktuality.css'
import { Link } from 'react-router-dom';


const OneAktualita = ({ date, headline, image, text }) => {
  console.log('Image URL:', image);
  

  const imageUrl = image && image !== '' ? `http://localhost:5000${image}` : 'http://localhost:5000/images/default.webp';

  return (
    <div className="aktualita-item">
      <div className="aktualita-and-about">
        <div className="aktualita-image-one">
          <img src={imageUrl} alt={headline} />
        </div>
        <div className='aktualita-about'>
          <h2>{headline}</h2>
          <p className='text-date-akt'>{date}</p>
        </div>
      </div>
      <p className='text-text-akt'>{text}</p>
      <div className="aktualita-aktualita">
        <Link to='/Aktuality'>Číst zde</Link>
      </div>
    </div>
  );
};



export default OneAktualita