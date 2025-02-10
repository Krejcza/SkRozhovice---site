import React, { useEffect, useState, useRef } from 'react';
import videoBg from '../components/videos/video-short.webm'
import './MainVideo.css'
import skRozText from '../components/images/SKrozhovicePic.png'
import fallBackImage from '../components/images/fallback.webp'

const MainVideo = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.saveData || (connection.downlink && connection.downlink < 3)) {
        setIsSlowConnection(true);
      }
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    if (videoElement) {
      videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, []);

  return (
    <div className='main-video'>
      {isVideoLoaded && <div className="overlay-video"></div>}
        
      {isSlowConnection ? (
        <img src={fallBackImage} alt="Background" className="fallback-image" />
      ) : (
        <video 
          ref={videoRef} 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      )}
      <div className="video-text">
        <img src={skRozText} alt="" />
      </div>
    </div>
  );
};

export default MainVideo;