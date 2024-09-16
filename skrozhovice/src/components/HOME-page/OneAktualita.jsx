import './Aktuality.css'


const OneAktualita = ({ date, headline, image, text }) => {
  console.log('Image URL:', image);
  

  const imageUrl = image && image !== '' ? `http://localhost:5000${image}` : 'http://localhost:5000/images/default.webp';

  return (
    <div className="aktualita-item">
      <img src={imageUrl} alt={headline} />
      <h2>{headline}</h2>
      <p className='text-date-akt'>{date}</p>
      <p className='text-text-akt'>{text}</p>
    </div>
  );
};



export default OneAktualita