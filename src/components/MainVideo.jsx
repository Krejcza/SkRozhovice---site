import React, { useEffect, useState } from 'react';
import videoBg from '../components/videos/video-short.mov'
import './MainVideo.css'
import skRozText from '../components/images/SKrozhovicePic.png'
import fallBackImage from '../components/images/fallback.webp'

const MainVideo = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.saveData || (connection.downlink && connection.downlink < 1.5)) {
        setIsSlowConnection(true);
      }
    }
  }, []);

  return (
    <div className='main-video'>
      <div className="overlay-video"></div>
      {isSlowConnection ? (
        <img src={fallBackImage} alt="Background" className="fallback-image" />
      ) : (
        <video src={videoBg} autoPlay loop muted playsInline></video>
      )}
      <div className="video-text">
        <img src={skRozText} alt="" />
      </div>
    </div>
  );
};

export default MainVideo;
