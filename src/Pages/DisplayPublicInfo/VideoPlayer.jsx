import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Videoplayer() {
  const vid = useParams();
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
      let mouse, intervalId;
      let isLeftSideHeld = false;

      const handleDoubleClick = (e) => {
        if (e.clientX < 300) {
          player.current.currentTime -= 5;
        } else if (e.clientX < 500 && e.clientX > 300) {
          if (player.current.paused) {
            player.current.play();
          } else {
            player.current.pause();
          }
        } else if (e.clientX < 800) {
          player.current.currentTime += 10;
        }
      };

      const handleMouseDown = (e) => {
        mouse = setTimeout(() => {
          if (e.clientX > 500) {
            player.current.playbackRate = 2;
          }
          if (e.clientX < 300) {
            isLeftSideHeld = true;
            intervalId = setInterval(() => {
              if (player.current.currentTime <= 0) {
                clearInterval(intervalId);
              } else {
                player.current.currentTime -= 0.05;
              }
            }, 10);
          }
        }, 500);
      };

      const handleMouseUp = () => {
        clearTimeout(mouse);
        clearInterval(intervalId);
        if (isLeftSideHeld) {
          player.current.playbackRate = 1;
          isLeftSideHeld = false;
        }
      };

      player.current.addEventListener('dblclick', handleDoubleClick);
      player.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        player.current.removeEventListener('dblclick', handleDoubleClick);
        player.current.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <div style={{ marginTop: '50px', height:"100vh" }}>
      <div style={{ width: '800px', height: '450px' }}>
        <video controls controlsList="nofullscreen" ref={player} style={{ width: '800px', height: '450px' }}>
          <source src={vid.videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Videoplayer;
