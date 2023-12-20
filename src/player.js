import { shoot } from "./shooter.js";
import { inputHelp, endInputhelp } from "./displayController.js";

class Taking{
    FullHand = new Boolean(false);
}

export async function InitFirstPersonController(charCtlSceneUUID) {

    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    const parentEntity = null;

    const deleteOnClientDisconnection = true;

    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: charCtlSceneUUID });

    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(

        "Joshua", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-50, 15, 80] })


    //shoot(playerSceneEntity);
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


document.addEventListener("keydown", async (event) => {
    const block1 = await SDK3DVerse.engineAPI.findEntitiesByEUID("bf378433-3fee-45f9-8f8a-2a76ea863832");
    if (event.key == "a") {
        if (block1[0].components.debug_name.value === "Levier") {
            SDK3DVerse.engineAPI.playAnimationSequence("0a61f9ee-f826-4abb-a52c-6cf54eaa3a60");
        }

        const props = await SDK3DVerse.engineAPI.findEntitiesByEUID("81f5074f-467e-41a7-a27b-f6eea634701c"); //Ref de la main

        console.log(props);
        props[0].setComponent('mesh_ref', "08df2ff1-9628-4309-a1d3-9f718f5fd85b" ); //Attache le components sur la main

    }
    else if (event.key == "p") {
        block1[0].setVisibility(false);
        //block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - transformCamera[0].getTransform().position[1], transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });
        //SDK3DVerse.engineAPI.deleteEntities(block);
    }
});

async function Take(block, playerSceneEntity) {

    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block, props) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);

        //console.log(playerSceneEntity, " entered trigger of ", block.components.debug_name.value);²

        inputHelp();

    });


    SDK3DVerse.engineAPI.onExitTrigger(async(playerSceneEntity, block)=>{
        SDK3DVerse.engineAPI.unselectAllEntities();
        endInputhelp();
    })
}