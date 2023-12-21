import { shoot } from "./shooter.js";
import { inputHelp, endInputhelp } from "./displayController.js";
import { increaseScoreForAction } from "./Score.js";

class Taking{
    FullHand = new Boolean(false);
}

export async function InitFirstPersonController(charCtlSceneUUID) {

    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    const parentEntity = null;

    const deleteOnClientDisconnection = true;


    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(

        "Joshua", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-50, 15, 80] })

    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("b6fe0125-4720-4d80-9f94-ec4ac74c8722");

    shoot(playerSceneEntity);
    Take(block, playerSceneEntity);

    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
        child.isAttached("camera")
    );


    // We need to assign the current client to the first person controller
    // script which is attached to the firstPersonController entity.
    // This allows the script to know which client inputs it should read.

    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

    SDK3DVerse.setMainCamera(firstPersonCamera);
}

async function Take(block, playerSceneEntity) {

    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
    const props = await SDK3DVerse.engineAPI.findEntitiesByEUID("6523e856-c7a4-4e63-a160-554424fcf5be");
    console.log(props);
    const meshBlock = {value : block};
    

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);

        inputHelp();
        document.addEventListener("keydown", async function (event) {
            if (event.key == "a") {

               /* const child  = playerSceneEntity.getChildren();
                const child1 = child[0].getChildren();
                console.log(child);
                console.log(child1);*/
                
                props.setComponent('mesh_ref', "bf378433-3fee-45f9-8f8a-2a76ea863832");
                increaseScoreForAction()//pour les obj de a machines 
                
                // Traitement de l'�v�nement
               /* setInterval(function () {
                    block.setGlobalTransform({ possition: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - 1, transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });

                }, 10);*/
            }
            else if (event.key == "p") {
                //block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - transformCamera[0].getTransform().position[1], transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });
                //SDK3DVerse.engineAPI.deleteEntities(block);
            }
        });

    });

    SDK3DVerse.engineAPI.onExitTrigger(async(playerSceneEntity, block)=>{
        SDK3DVerse.engineAPI.unselectAllEntities();
        endInputhelp();
    })
}

