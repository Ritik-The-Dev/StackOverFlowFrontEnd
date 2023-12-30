import React, { useRef, useEffect } from 'react';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';
import { useParams } from 'react-router-dom';

function Videoplayer() {
  const vid = useParams();
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
      const plyr = new Plyr(player.current, {
        fullscreen: { enabled: false, fallback: false },
        clickToPlay: false,
      });

      let mouse, intervalId;
      let isLeftSideHeld = false;

      plyr.on('dblclick', (e) => {
        if (e.clientX < 300) {
          plyr.rewind(5);
        } else if (e.clientX < 500 && e.clientX > 300) {
          plyr.togglePlay();
        } else if (e.clientX < 800) {
          plyr.forward(10);
        }
      });

      plyr.on('mousedown', (e) => {
        mouse = setTimeout(() => {
          if (e.clientX > 500) {
            plyr.speed = 2;
          }
          if (e.clientX < 300) {
            isLeftSideHeld = true;
            intervalId = setInterval(() => {
              if (plyr.currentTime <= 0) {
                clearInterval(intervalId);
              } else {
                plyr.rewind(0.05);
              }
            }, 10);
          }
        }, 500);
      });

      plyr.on('mouseup', () => {
        clearTimeout(mouse);
        clearInterval(intervalId);
        if (isLeftSideHeld) {
          plyr.speed = 1;
          isLeftSideHeld = false;
        }
      });
    }
  }, []);

  return (
    <div style={{ marginTop: '50px', height:"100vh" }}>
      <div style={{ width: '800px', height: '450px' }}>
        <video controls ref={player} style={{ width: '800px', height: '450px' }}>
          <source src={vid.videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Videoplayer;
