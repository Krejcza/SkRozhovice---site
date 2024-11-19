import React, { useState, useEffect } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';


// Komponenta pro zobrazení jedné aktuality
const OneAktualita = ({ id, date, headline, image, text, category, lineup }) => {
  const [imageError, setImageError] = useState(false);
  const [expander, setExpander] = useState(false);
  const [iconDirection, setIconDirection] = useState(faChevronRight);

  // Stavy pro like/dislike funkcionalitu
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userStatus, setUserStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Defaultní obrázek pro případ chyby
  const defaultImage = 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1731591618/SkRozhovice/ooo6wxdqeuzyybxxcgbx.webp';
  const imageUrl = imageError || !image ? defaultImage : image;

  // Dynamické stylování kategorie
  const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                            category === 'ZÁPAS' ? 'cat-zapas' : '';


   // Funkce pro práci s cookies na liky                          
  const getCookieStatus = () => Cookies.get(`aktualita-${id}-status`);
  const setCookieStatus = (status) => Cookies.set(`aktualita-${id}-status`, status, { expires: 365 });
  const removeCookieStatus = () => Cookies.remove(`aktualita-${id}-status`);


  // Effect pro načtení statusu aktuality
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/aktualita/${id}/status`);
        
        if (!response.ok) {
          const savedStatus = getCookieStatus();
          if (savedStatus) {
            setUserStatus(savedStatus);

            if (savedStatus === 'liked') setLikeCount(prev => prev + 1);
            if (savedStatus === 'disliked') setDislikeCount(prev => prev + 1);
          }
          return;
        }

        const data = await response.json();
        setLikeCount(data.likeCount || 0);
        setDislikeCount(data.dislikeCount || 0);

        if (data.userStatus) {
          setUserStatus(data.userStatus);
          setCookieStatus(data.userStatus);
        } else {
          const savedStatus = getCookieStatus();
          if (savedStatus) setUserStatus(savedStatus);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        // V případě chyby se použijou data z cookies
        const savedStatus = getCookieStatus();
        if (savedStatus) {
          setUserStatus(savedStatus);
          if (savedStatus === 'liked') setLikeCount(prev => prev + 1);
          if (savedStatus === 'disliked') setDislikeCount(prev => prev + 1);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [id]);


  // Funkce pro zpracování chyby načtení obrázku
      const handleImageError = () => {
        setImageError(true);
        console.log('Obrázek se nepodaařilo nahrát. Bude použitý defaultní obrázek.');
      };

  // Funkce pro roztažení/zmenšení obrázku
      const toggleImageExpansion = () => {
        setExpander(!expander); 
        setIconDirection(expander ? faChevronRight : faChevronLeft); 
      };

  // Funkce pro like
      const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        try {
          if (userStatus === 'liked') {
            await handleRemoveLike();
            return;
          }
    
          if (userStatus === 'disliked') {
            await handleRemoveDislike();
          }
    
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/like`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Chyba při likování aktuality');
          }
    
          const data = await response.json();
          setLikeCount(data.likeCount || likeCount + 1);
          setUserStatus('liked');
          setCookieStatus('liked');
          
        } catch (error) {
          console.error('Error:', error);
          alert('Nepodařilo se přidat like. Zkuste to prosím později.');
        } finally {
          setIsLoading(false);
        }
      };
    

  // Funkce pro dislike aktuality
      const handleDislike = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        try {
          if (userStatus === 'disliked') {
            await handleRemoveDislike();
            return;
          }
    
          if (userStatus === 'liked') {
            await handleRemoveLike();
          }
    
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/dislike`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Chyba při dislikování aktuality');
          }
    
          const data = await response.json();
          setDislikeCount(data.dislikeCount || dislikeCount + 1);
          setUserStatus('disliked');
          setCookieStatus('disliked');
          
        } catch (error) {
          console.error('Error:', error);
          alert('Nepodařilo se přidat dislike. Zkuste to prosím později.');
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleRemoveLike = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/unlike`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Chyba odebrání liku.');
          }
    
          const data = await response.json();
          setLikeCount(data.likeCount || likeCount - 1);
          setUserStatus(null);
          removeCookieStatus();
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleRemoveDislike = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/undislike`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Chyba odebrání disliku.');
          }
    
          const data = await response.json();
          setDislikeCount(data.dislikeCount || dislikeCount - 1);
          setUserStatus(null);
          removeCookieStatus();
        } catch (error) {
          console.error('Error:', error);
        }
      };
    

      
  return (
    <div className="aktualita-container">
      <div className='category-akt'>
        <p className={`category-text ${categoryTextClass}`}>{category}</p>
        <p className='category-date'>{date}</p>
      </div>

      <div className="only-imagination">
        <img 
          src={imageUrl}
          alt={headline} 
          className={`aktualita-image ${expander ? 'expanded' : ''}`} 
          onClick={toggleImageExpansion} 
          onError={handleImageError} 
        />
        <div className={`icon-next ${expander ? 'expanded' : ''}`} onClick={toggleImageExpansion}>  
          <FontAwesomeIcon icon={iconDirection} />
        </div>
      </div>

      <div className="aktualita-insider">
        <div className="headline-headerr">
          <h2 className='headline-akt'>{headline}</h2>
        </div>
        <div className='aktualita-filling'>
          <p className="text-akt">{text}</p>
          {lineup && (
            <div className='lineup-container'>
              <p className='lineup-label'>Sestava:</p>
              <p className='lineup-text'>{lineup}</p>
            </div>
          )}
        </div>
        <div className="like-dislike-container">
        <button 
          className={`like-button ${userStatus === 'liked' ? 'active' : ''}`} 
          onClick={handleLike}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          {likeCount}
        </button>
        <button 
          className={`dislike-button ${userStatus === 'disliked' ? 'active' : ''}`} 
          onClick={handleDislike}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
          {dislikeCount}
        </button>
      </div>
      </div>
    </div>
  );
};

export default OneAktualita;
