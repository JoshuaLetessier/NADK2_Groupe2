import { shoot } from "./shooter.js";
import { inputHelp, endInputhelp } from "./displayController.js";
import { increaseScoreForAction } from "./Score.js";

class Variable {
    constructor() {
        this.FullHand = false;
        this.Count = 0;
    }

}

/*class Entity {

    HandProps = SDK3DVerse.engineAPI.findEntitiesByEUID("8975af37-d5b6-4137-bb6c-f6fc4fe36fd2"); //Ref de la main
}*/

export async function InitFirstPersonController(charCtlSceneUUID) {
    
    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    const parentEntity = null;

    const deleteOnClientDisconnection = true;

    const PropsTriggerEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: charCtlSceneUUID });

    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(

        "Quentin", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [0, 0, 0] })

    const firstPersonController = (await playerSceneEntity.getChildren())[0];

    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
        child.isAttached("camera")
    );

    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

    SDK3DVerse.setMainCamera(firstPersonCamera);

    InputEvent(PropsTriggerEntity, playerSceneEntity);
    //Take(PropsTriggerEntity, playerSceneEntity);

}


async function InputEvent(PropsTriggerEntity, playerSceneEntity) {
    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    let instance = new Variable();

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, PropsTriggerEntity, props) => {
       
        SDK3DVerse.engineAPI.selectEntities([PropsTriggerEntity]); //surbrillance de l'object

        if (FullHand == flase) {
            document.addEventListener("keydown", async (event) => {

                if (event.key == "a") {
                    instance.FullHand = true;
                    console.log(instance.FullHand);
                    instance.Count += 1;
                    document.removeEventListener("keydown", async (event));
                }
            })
        }
        else {
            console.log(instance.Count);
        }
    })

    SDK3DVerse.engineAPI.onExitTrigger(async (playerSceneEntity, block) => {
        SDK3DVerse.engineAPI.unselectAllEntities();
        endInputhelp();
    })

}


/*
async function Take()
{
    const HandProps = await SDK3DVerse.engineAPI.findEntitiesByEUID("8975af37-d5b6-4137-bb6c-f6fc4fe36fd2"); //Ref de la main

    if (event.key == "a") {
        console.log(PropsTriggerEntity);
        if (PropsTriggerEntity.components.debug_name.value === "Levier") {
            SDK3DVerse.engineAPI.playAnimationSequence("0a61f9ee-f826-4abb-a52c-6cf54eaa3a60");
        }
        if (PropsTriggerEntity.components.debug_name.value === "Sphere" || PropsTriggerEntity.components.debug_name.value === "Cube-cle") {
            HandProps[0].setComponent('mesh_ref', { value: PropsTriggerEntity.components.mesh_ref.value }); //Attache le components sur la main
            props[0].setVisibility(true);
            x = true
            increaseScoreForAction();
        }
        if (PropsTriggerEntity.components.debug_name.value === "EtagereAp") {
            console.log("Beaucoup trop gros");
            if (x == true) {
                SDK3DVerse.engineAPI.playAnimationSequence("3301dda7-c537-454e-8afb-3b8d71872ac8");
                props[0].setVisibility(false);
            }
        }
    else if (event.key == "p") {
        block1[0].setVisibility(true);
        props[0].setVisibility(false);
        SDK3DVerse.engineAPI.playAnimationSequence("88576897-0aca-494e-a1fe-31584575287c");
    }

}
*/





/// Another Code
/*
if (PropsTriggerEntity.components.debug_name.value !== "machinedroite") {
const input = "a";
inputHelp(input);
}
else {
const input = "p";
inputHelp(input);
}
*/