import React, { useState, useEffect } from 'react';

export const Overlay = () => {
  const [time, setTime] = useState(5 * 60);

  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => {
      clearInterval(refreshIntervalId);
    };
  }, []); // Le tableau vide signifie que cela ne doit être exécuté qu'une fois lors du montage

  const updateCountdown = () => {
    setTime((prevTime) => {
      const minutes = Math.floor(prevTime / 60);
      let seconds = prevTime % 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;

      //console.log(`${minutes}:${seconds}`);

      if (prevTime <= 0) {
        clearInterval(refreshIntervalId);
        //console.log("Temps écoulé");
        // Faites ce que vous devez faire à la fin du compte à rebours ici
      }

      return prevTime - 1;
    });
  };

  return (
    <div id="overlay"
    style={{
        position: 'absolute',
        //zIndex: '9999vw',
        top: '15',
        left: '15',
        color: 'white',
        backgroundColor:'black',
      }}
      
      >
      <div>{time < 0 ? 'Temps écoulé' : `${Math.floor(time / 60)}:${time % 60}`}</div>
    </div>
  );
};

export default Overlay;

let time = 5 * 60; //minutes * 60 seconds
let refreshIntervalId = setInterval(updateCountdown, 1000); //update every 1 second

export async function updateCountdown() {
   // const minutes = Math.floor(time / 60); // rounds a number DOWN to the nearest integer
    ////let seconds = time % 60;

    //seconds = seconds < 10 ? '0' + seconds : seconds;

    time--;

    if (time < 0) { //stop the setInterval whe time = 0 for avoid negative time
        clearInterval(refreshIntervalId);
    }
    if(time === -1)
    {
        //console.log("mort");
        //location.reload();
    }

    //console.log(refreshIntervalId, "timer 1");
    //console.log(time, "time 2");
}