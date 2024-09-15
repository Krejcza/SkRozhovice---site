import React from 'react'
import videoBg from '../components/videos/dg.mp4'
import './MainVideo.css'
import skRozText from '../components/images/skrozpic.png'

const MainVideo = () => {
  return (
    <div className='main-video'>
      <div className="overlay-video"></div>
      <video src={videoBg} autoPlay loop muted></video>
      <div className="video-text">
        <img src={skRozText} alt="" />
      </div>
    </div>
  )
}

export default MainVideo
