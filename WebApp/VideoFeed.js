import React from 'react'
import '../styles/dashboard.css'
import temp from '../camera.jpeg'

function VideoFeed() {
  return (
    <div className='livefeed'>
        <p>Live Feed</p>
        <img className="videofeed" /* src='http://192.168.43.59:8000/video_feed' */ src={temp}/>
    </div>
    

  )
}

export default VideoFeed