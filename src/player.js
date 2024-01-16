import { shoot } from "./shooter.js";
import { inputHelp, endInputhelp } from "./displayController.js";
import { increaseScoreForAction } from "./Score.js";

class Taking {
    FullHand = new Boolean(false);
}

export async function InitFirstPersonController(charCtlSceneUUID) {
    var x = new Boolean(false);

    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    const parentEntity = null;

    const deleteOnClientDisconnection = true;

    const PropsTriggerEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: charCtlSceneUUID });

    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(

        "Joshua", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-55, 18, 80] })

    //shoot(playerSceneEntity);
    Take(PropsTriggerEntity, playerSceneEntity, x);

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


async function Take(PropsTriggerEntity, playerSceneEntity, x) {
    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, PropsTriggerEntity, props) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([PropsTriggerEntity]);
        if (PropsTriggerEntity.components.debug_name.value !== "machinedroite") {
            const input = "a";
            inputHelp(input);
        }
        else {
            const input = "p";
            inputHelp(input);
        }

        document.addEventListener("keydown", async (event) => {
            const block1 = await SDK3DVerse.engineAPI.findEntitiesByEUID("39f3f7d5-5a09-4e33-ab16-72229bd88aaf");
            const props = await SDK3DVerse.engineAPI.findEntitiesByEUID("8975af37-d5b6-4137-bb6c-f6fc4fe36fd2"); //Ref de la main
            if (event.key == "a") {
                console.log(PropsTriggerEntity);
                if (PropsTriggerEntity.components.debug_name.value === "Levier") {
                    SDK3DVerse.engineAPI.playAnimationSequence("0a61f9ee-f826-4abb-a52c-6cf54eaa3a60");
                }
                if (PropsTriggerEntity.components.debug_name.value === "Sphere" || PropsTriggerEntity.components.debug_name.value === "Cube-cle") {
                    props[0].setComponent('mesh_ref', { value: PropsTriggerEntity.components.mesh_ref.value }); //Attache le components sur la main
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
            }
            else if (event.key == "p") {
                block1[0].setVisibility(true);
                props[0].setVisibility(false);
                SDK3DVerse.engineAPI.playAnimationSequence("88576897-0aca-494e-a1fe-31584575287c");
            }
        });

    });
    SDK3DVerse.engineAPI.onExitTrigger(async (playerSceneEntity, block) => {
        SDK3DVerse.engineAPI.unselectAllEntities();
        endInputhelp();
    })
}