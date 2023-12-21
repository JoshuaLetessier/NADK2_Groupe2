// Score.js
let score = 1500;

function decreaseScore() {
    setInterval(function() {
        // Diminuer le score (ajuster la valeur selon vos besoins)
        score -= 5;

        // Mettre à jour l'affichage du score
        updateScoreDisplay();
    }, 1000); // Intervalles de 1 seconde (ajustez selon vos besoins)
}

export function increaseScoreForAction() {
    // Augmenter le score (ajuster la valeur selon vos besoins)
    score += 10;

    // Mettre à jour l'affichage du score
    updateScoreDisplay();
}

function updateScoreDisplay() {
    // Mettre à jour l'élément HTML avec le nouveau score
    const pointElement = document.getElementById('point');
    if (pointElement) {
        if(score > 0)
        {
            pointElement.textContent = "Point : " + score;
        }
        else
        {
            pointElement.textContent = "Point : 0";
        }
        
    }
    
}

// Appel de la fonction pour diminuer le score
decreaseScore();
