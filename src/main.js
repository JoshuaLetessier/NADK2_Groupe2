import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";
import { InitFirstPersonController, } from "./player.js";
import { updateBulletDisplay, audioOnEvent, bestScore} from "./displayController.js";
import {startMobsLoop } from "./Mobs/SimpleMouveController.js";


async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    connectToEditor: true,
    startSimulation: "on-assets-loaded",
  });
   
    const canvas = document.getElementById("display_canvas");//c'est null mais je sais pas
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function example() {
        console.log("Début du script");

        // Utilisation de la fonction delay pour introduire un délai de 2 secondes
        //await delay(9200);
        await InitFirstPersonController(characterControllerSceneUUID);
        await startMobsLoop();
        await bestScore();
        //await setFPSCameraController(canvas);

        console.log("Exécution après un délai de 9.2 secondes");

        console.log("Fin du script");
    }
    const animationSequenceUUID = "3fcd65b5-931a-45b7-ab7e-4855b01a8a05";
    const settings = { playbackSpeed: 1 };
    const mainCamera = await SDK3DVerse.engineAPI.findEntitiesByEUID("3b078256-a148-4d48-8811-1cdf0ebc12aa");
    //console.log(mainCamera);
    SDK3DVerse.setMainCamera(mainCamera[0]);
    //SDK3DVerse.engineAPI.stopAnimationSequence(animationSequenceUUID);
    //SDK3DVerse.engineAPI.playAnimationSequence(animationSequenceUUID, settings);
    example();
    //audioOnEvent();
}

window.addEventListener('load', InitApp());

//------------------------------------------------------------------------------merci gabriel
async function setFPSCameraController(canvas){
  // Remove the required click for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
  // LOOK_DOWN actions.
  SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
  SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
  SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
  SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
  SDK3DVerse.actionMap.propagate();

  if (canvas) {
    // Lock the mouse pointer.
    if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
    } else if (canvas.mozRequestPointerLock) {
        canvas.mozRequestPointerLock();
    } else if (canvas.webkitPointerLockElement) {
        canvas.webkitPointerLockElement();
    } else {
        console.error('La fonction requestPointerLock n\'est pas disponible dans ce navigateur.');
    }
} else {
    console.error('L\'élément canvas n\'a pas été trouvé dans le DOM.');
}

};

//mouvement latérale infini
/*document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('display-canvas');
  var mouseX = 0;
  var mouseY = 0;
  if (canvas) {
      canvas.requestPointerLock = (
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock
      );

      document.exitPointerLock = (
          document.exitPointerLock ||
          document.mozExitPointerLock ||
          document.webkitExitPointerLock
      );

      canvas.addEventListener('mousemove', function(event) {
          var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
          var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

          // Appliquer le mouvement à votre caméra ou à votre logique de jeu
          // ...

          // Exemple d'ajustement des coordonnées de la souris pour traverser les bords
           mouseX += movementX;
           mouseY += movementY;
           
          if (mouseX < 0) {
              mouseX = canvas.width - 1;
          } else if (mouseX >= canvas.width) {
              mouseX = 0;
          }

          if (mouseY < 0) {
              mouseY = canvas.height - 1;
          } else if (mouseY >= canvas.height) {
              mouseY = 0;
          }

          // Utilisez les coordonnées mouseX et mouseY pour effectuer d'autres actions si nécessaire
      });

      canvas.addEventListener('click', function() {
          canvas.requestPointerLock();
      });
  } else {
      console.error('L\'élément canvas n\'a pas été trouvé dans le DOM.');
  }
});*/

//affichage du nombres de balles au lancements
document.addEventListener('DOMContentLoaded', function() { updateBulletDisplay();})


