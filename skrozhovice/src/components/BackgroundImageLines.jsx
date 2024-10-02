import React from 'react';
import linesImage from '../components/images/hive-new.png';

const BackgroundImageLines = ({ offsetY }) => {
  return (
    <div
      className='imagination-background'
      style={{
        backgroundImage: `url(${linesImage})`,
        transform: `translateX(-50%) translateY(${offsetY * 0.5}px)`
      }}
    />
  );
};

export default BackgroundImageLines;
