import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Videoplayer() {
  const [isRightSideHeld, setIsRightSideHeld] = useState(false);
  const videoRef = useRef(null);
  const { videoUrl } = useParams();

  useEffect(() => {
    const video = videoRef.current;

    const handleDblClick = (e) => {
      if (e.clientX < 300) {
        video.currentTime -= 5;
      } else if (e.clientX < 500 && e.clientX > 300) {
        video.paused ? video.play() : video.pause();
      } else if (e.clientX < 800) {
        video.currentTime += 10;
      }
    };

    const handleMouseDown = (e) => {
      if (e.clientX > 500) {
        setIsRightSideHeld(true);
        video.playbackRate = 2;
      }
    };

    const handleMouseUp = () => {
      if (isRightSideHeld) {
        setIsRightSideHeld(false);
        video.playbackRate = 1;
      }
    };

    const handleFullscreen = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    video.addEventListener('dblclick', handleDblClick);
    video.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    video.addEventListener('fullscreenchange', handleFullscreen);

    return () => {
      video.removeEventListener('dblclick', handleDblClick);
      video.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      video.removeEventListener('fullscreenchange', handleFullscreen);
    };
  }, [isRightSideHeld]);

  return (
    <div style={{ marginTop: '50px', height: '100vh' }}>
      <div style={{ width: '800px', height: '450px' }}>
        <video controls ref={videoRef} style={{ width: '800px', height: '450px' }}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Videoplayer;
