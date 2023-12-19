function startTimer(durationInSeconds) {
    let timerElement = document.getElementById('timer');

    let timer = durationInSeconds;
    let hours, minutes, seconds;

    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = hours + ':' + minutes + ':' + seconds;

        if (--timer < 0) {
            // Le minuteur a atteint z�ro, vous pouvez effectuer des actions ici
            timer = durationInSeconds; // R�initialiser le minuteur
        }
    }, 1000);
}

// Utilisation : d�marrer le minuteur avec une dur�e de 10 minutes
startTimer(600);
