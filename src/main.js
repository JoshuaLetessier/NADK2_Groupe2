/*import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
} from "./config.js";

import { InitFirstPersonController, } from "./player.js";
import { updateCountdown } from "./Timer.js";


async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    connectToEditor: true,
    startSimulation: "on-assets-loaded",
    
  });

    await InitFirstPersonController(characterControllerSceneUUID);
    await updateCountdown();
}


window.addEventListener('load', InitApp());*/
