import React, { useState, useEffect } from 'react';
import './AktualityMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const OneAktualita = ({ id, date, headline, image, text, category, lineup }) => {
  const [imageError, setImageError] = useState(false);
  const [expander, setExpander] = useState(false);
  const [iconDirection, setIconDirection] = useState(faChevronRight);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userStatus, setUserStatus] = useState(null);

  const defaultImage = 'https://res.cloudinary.com/dirmiqkcn/image/upload/v1731591618/SkRozhovice/ooo6wxdqeuzyybxxcgbx.webp';
  const imageUrl = imageError || !image ? defaultImage : image;

  const categoryTextClass = category === 'INFO' ? 'cat-info' : 
                            category === 'ZÁPAS' ? 'cat-zapas' : '';

      useEffect(() => {
        const fetchStatus = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/aktualita/${id}/status`, {
              method: 'GET',
            });
            if (!response.ok) throw new Error('Error fetching like/dislike data');
            const data = await response.json();
            setLikeCount(data.likeCount);
            setDislikeCount(data.dislikeCount);

            // Preferovat stav ze serveru nad cookies
            if (data.userStatus) {
              setUserStatus(data.userStatus); // Backend vrací 'liked' nebo 'disliked'
              Cookies.set(`aktualita-${id}-status`, data.userStatus, { expires: 365 });
            } else {
              const savedStatus = Cookies.get(`aktualita-${id}-status`);
              if (savedStatus) setUserStatus(savedStatus);
            }
          } catch (error) {
            console.error('Error fetching like/dislike data:', error);
          }
        };

        fetchStatus();
      }, [id]);

      const handleImageError = () => {
        setImageError(true);
        console.log('Image failed to load, falling back to default');
      };

      const toggleImageExpansion = () => {
        setExpander(!expander); 
        setIconDirection(expander ? faChevronRight : faChevronLeft); 
      };

      const handleLike = async () => {
        if (userStatus === 'liked') {
          // If already liked, remove like
          await handleRemoveLike();
        } else {
          // If disliked, remove dislike before liking
          if (userStatus === 'disliked') await handleRemoveDislike();
          try {
            const response = await fetch(`http://localhost:5000/api/aktualita/${id}/like`, { method: 'POST' });
            if (!response.ok) {
              const data = await response.json();
              alert(data.message);
              return;
            }
            const data = await response.json();
            setLikeCount(data.likeCount);
            setUserStatus('liked');
            Cookies.set(`aktualita-${id}-status`, 'liked', { expires: 365 });
          } catch (error) {
            console.error('Error liking the article:', error);
          }
        }
      };

      const handleDislike = async () => {
        if (userStatus === 'disliked') {
          // If already disliked, remove dislike
          await handleRemoveDislike();
        } else {
          // If liked, remove like before disliking
          if (userStatus === 'liked') await handleRemoveLike();
          try {
            const response = await fetch(`http://localhost:5000/api/aktualita/${id}/dislike`, { method: 'POST' });
            if (!response.ok) {
              const data = await response.json();
              alert(data.message);
              return;
            }
            const data = await response.json();
            setDislikeCount(data.dislikeCount);
            setUserStatus('disliked');
            Cookies.set(`aktualita-${id}-status`, 'disliked', { expires: 365 });
          } catch (error) {
            console.error('Error disliking the article:', error);
          }
        }
      };

      const handleRemoveLike = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/unlike`, { method: 'POST' });
          if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            return;
          }
          const data = await response.json();
          setLikeCount(data.likeCount);
          setUserStatus(null);
          Cookies.remove(`aktualita-${id}-status`);
        } catch (error) {
          console.error('Error removing like:', error);
        }
      };

      const handleRemoveDislike = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/aktualita/${id}/undislike`, { method: 'POST' });
          if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            return;
          }
          const data = await response.json();
          setDislikeCount(data.dislikeCount);
          setUserStatus(null);
          Cookies.remove(`aktualita-${id}-status`);
        } catch (error) {
          console.error('Error removing dislike:', error);
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
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            {likeCount}
          </button>
          <button 
            className={`dislike-button ${userStatus === 'disliked' ? 'active' : ''}`} 
            onClick={handleDislike} 
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
