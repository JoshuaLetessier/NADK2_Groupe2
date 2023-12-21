import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";
import { InitFirstPersonController, } from "./player.js";
import { bestScore } from "./displayController.js";
import { findSession } from "./fontion.js";


async function InitApp() {
    const sessions = findSession(mainSceneUUID, publicToken);
    console.log(sessions);
    sessions.then(resultat => {
        console.log(resultat);
        if (resultat == null){
            SDK3DVerse.startSession({
                userToken: publicToken,
                sceneUUID: mainSceneUUID,
                canvas: document.getElementById("display-canvas"),
                connectToEditor: true,
                startSimulation: "on-assets-loaded",
              });
        } else {
            if (resultat[0]["session_id"]!= "" && resultat[0]["clients"][3] == null){
                SDK3DVerse.joinSession({
                    userToken: publicToken,
                    sceneUUID: mainSceneUUID,
                    canvas: document.getElementById("display-canvas"),
                    connectToEditor: true,
                    startSimulation: "on-assets-loaded",
                });
            }
        }
         
    })

    /*await SDK3DVerse.joinOrStartSession({
        userToken: publicToken,
        sceneUUID: mainSceneUUID,
        canvas: document.getElementById('display-canvas'),
        viewportProperties: {
          defaultControllerType: SDK3DVerse.controller_type.orbit,
        },
      });*/
   
    const canvas = document.getElementById("display_canvas");//c'est null mais je sais pas

    await InitFirstPersonController(characterControllerSceneUUID);
    await bestScore();
    await setFPSCameraController(canvas);
}

window.addEventListener('load', InitApp());

//------------------------------------------------------------------------------merci gabriel
async function setFPSCameraController(canvas){
  console.log(canvas);
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
    canvas.style.cursor = "none";
}

};

//mouvement latérale infini
document.addEventListener('DOMContentLoaded', function() {
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
});
