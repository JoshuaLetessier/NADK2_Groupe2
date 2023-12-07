import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
  level,
  characterEntity,
  objectEntity,
} from "./config.js";

import { InitFirstPersonController, } from "./player.js";





async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    connectToEditor: true,
    startSimulation: "on-assets-loaded",
    
  });

    await InitFirstPersonController(characterControllerSceneUUID);



}


window.addEventListener('load', InitApp());
