import React, { useState, useEffect, useCallback} from 'react';
import { inactiveStyle, activeStyle } from '../constants/'


export default function DrumPad({keyCode, power, updateDisplay, keyTrigger, clipId, clip, ...props}) {
    const [padStyle, setPadStyle] = useState(inactiveStyle);
    const handleKeyPress = useCallback(event => {
        if (event.keyCode === keyCode) {
            playSound();
          }
    }, [keyCode]);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
   
    function activatePad() {
      if (power) {
        if (padStyle.backgroundColor === 'orange') {
          setPadStyle(inactiveStyle);
        } else {
          setPadStyle(activeStyle)
        }
      } else if (padStyle.marginTop === 13) {
        setPadStyle(inactiveStyle)
      } else {
        setPadStyle({ height: 77, marginTop: 13, backgroundColor: 'grey', boxShadow: '0 3px grey' });
      }
    }
    function playSound() {
      const sound = document.getElementById(keyTrigger);
      sound.currentTime = 0;
      sound.play();
      activatePad();
      setTimeout(() => activatePad(), 100);
      updateDisplay(clipId.replace(/-/g, ' '));
    }
    return (
        <div
            className='drum-pad'
            id={clipId}
            onClick={playSound}
            style={padStyle}
            >
            <audio className='clip' id={keyTrigger} src={clip}/>
            {keyTrigger}
        </div>
    );
}