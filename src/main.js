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
  await play();
 
}

window.addEventListener('load', InitApp());

async function play()
{
    console.log("oui ?")
    const entities = await SDK3DVerse.engineAPI.findEntitiesByEUID('6248d447-a886-4546-8037-978961d70424');
    const entities1 = await SDK3DVerse.engineAPI.findEntitiesByEUID('87007a41-7f92-4e94-8a42-2dfbac7a2d1a');
    
    console.log(entities);
    console.log(entities1);

    SDK3DVerse.engineAPI.onEnterTrigger(entities, entities1) //emitter -> player trigger-> la liste des pièces du niveau
    {
      console.log("oui 2")
    }
    
    //setTimeout(play, 1000);
}

