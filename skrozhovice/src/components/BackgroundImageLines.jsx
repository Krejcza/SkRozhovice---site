import React from 'react'
import Lines from './images/lines.png'

const BackgroundImageLines = ({ offsetY }) => {
  return (
    <div>
      <img
          src={Lines}
          alt="Lines Background"
          className='imagination-background'
          style={{
            transform: `translateX(-50%) translateY(${offsetY * 0.5}px)`
          }}
        />
    </div>
  )
}

export default BackgroundImageLines
