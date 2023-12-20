document.addEventListener("DOMContentLoaded", function () {
    // Attend que le document soit complètement chargé avant de démarrer le minuteur

    function startTimer(durationInSeconds) {
        let timerElement = document.getElementById('timer');

        let timer = durationInSeconds;
        let hours, minutes, seconds;

        setInterval(function () {
            //hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);

           // hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerElement.textContent = minutes + ':' + seconds;

            if (--timer < 0) {
                // Le minuteur a atteint zéro
                timerElement.textContent = "Vous êtes mort";
                // Vous pouvez effectuer d'autres actions ici si nécessaire
                // Par exemple, arrêter le minuteur ou déclencher une autre fonction
            }
        }, 1000);
    }

    // Utilisation : démarrer le minuteur avec une durée de 10 minutes
    startTimer(300); // Utilisation d'une courte durée à des fins de démonstration
});
