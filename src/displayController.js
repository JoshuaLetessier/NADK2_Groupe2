export async function inputHelp(input)
{
    if(input === "a" || input === "A")
    {
        var outputElement = document.getElementById('inputHelp');
        outputElement.textContent = "A pour ramasser";
        console.log('A pour ramasser')
    }
    else if( input === "p" || input === "P")
    {
        var outputElement = document.getElementById('inputHelp');
        outputElement.textContent = "P pour ramasser";
        console.log('P pour ramasser')
    }
}

export async function endInputhelp()
{
    var outputElement = document.getElementById('inputHelp');
    outputElement.textContent = " ";
}

export async function bestScore() {
    // Utilisez une variable pour suivre l'état d'affichage
    let isDisplayed = false;
//a voir si y'a moyen avec tab mais ça demande de désactiver pas mal d'option par défaut lié au navigateur
//utiliser  event.preventDefault(); // Désactiver le comportement par défaut mais pas tous à priori
    document.addEventListener("keydown", async function(event) {
        if (event.key === "t" && !isDisplayed) {
            try {
                const response = await fetch('../dataPlayer/bestScore.json');
                const scores = await response.json();

                // Traitez les scores et affichez-les comme une liste
                displayScores(scores);
                isDisplayed = true; // Mettez à jour l'état d'affichage
            } catch (error) {
                console.error('Erreur lors de la récupération des scores :', error);
            }
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "t") {
            // Supprimez le conteneur lorsque la touche "Tab" est relâchée
            removeScoreContainer();
            isDisplayed = false; // Réinitialisez l'état d'affichage
        }
    });
}

function displayScores(scores) {
    // Créer un élément conteneur pour les scores
    var containerElement = document.createElement('div');
    containerElement.id = 'scoreContainer';
    document.body.appendChild(containerElement);

    // Récupérer la liste à partir de l'élément créé
    var scoreList = document.createElement('ul');
    
    // Ajouter chaque score à la liste
    scores.forEach(score => {
        var listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.score}`;
        scoreList.appendChild(listItem);
    });

    // Ajouter la liste au conteneur
    containerElement.appendChild(scoreList);
}

function removeScoreContainer() {
    // Supprimer le conteneur du DOM
    var containerElement = document.getElementById('scoreContainer');
    if (containerElement) {
        containerElement.remove();
    }
}

export async function getBulletCout()
{
    var bulletCount = 10;
    return bulletCount;
}


export async function updateBulletDisplay() {
    var bulletCount = getBulletCout();
    var bulletDisplay = document.getElementById('amo');
    if (bulletDisplay) {
        bulletDisplay.textContent = "Bullets: " + bulletCount;
    }
}

/*function incrementBullets() {
    bulletCount++;
    updateBulletDisplay();
}*/

export function audioOnEvent() {
    // Récupérer l'élément audio par son ID
    var audio = document.getElementById('idMusic');

    // Fonction pour jouer l'audio en boucle
    function playAudio() {
        // Vérifier si l'élément audio existe
        if (audio) {
            // Activer la lecture en boucle
            audio.loop = true;
            
            // Jouer l'audio
            audio.play();
        } else {
            console.error("L'élément audio n'a pas été trouvé.");
        }
    }

    // Attacher l'événement au clic sur n'importe quel élément de la page
    document.addEventListener('click', playAudio);

    // Attacher l'événement à l'appui sur n'importe quelle touche au chargement de la page
    document.addEventListener('keydown', playAudio);
}

// Appeler la fonction au chargement de la page
window.onload = function () {
    audioOnEvent();
};


