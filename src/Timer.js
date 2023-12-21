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
                loose();
            }
        }, 1000);
    }

    // Utilisation : démarrer le minuteur avec une durée de 10 minutes
    startTimer(6000000); // Utilisation d'une courte durée à des fins de démonstration
});


function loose()
{
    console.log("0");
    const looseElement = document.getElementById('loose');
    if (looseElement) {
        console.log("1");
        looseElement.textContent = "You lost! Refreshing the page...";
        setTimeout(function() {
            // Rafraîchir la page après un certain délai (par exemple, 3 secondes)
            location.reload();
        }, 3000); // 3000 millisecondes équivalent à 3 secondes
    }
}
