export async function InitFirstPersonController(charCtlSceneUUID) {

    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });


    const parentEntity = null;

    const deleteOnClientDisconnection = true;


    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
        "Quentin", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-3, 0, 0] })

    //const player = await SDK3DVerse.engineAPI.findEntitiesByEUID("9ce6d264-7ae4-49f8-8b91-2f89aeafc5bb");

    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("4f0e8ff7-2ac6-46e6-b7d9-8c77cc99779a");
    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);

        document.addEventListener("keydown", function (event) {
            if (event.key == "a") {
                // Traitement de l'événement
                setInterval(function () {
                    block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - 1, transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });
                    
                }, 10);
            }
            else if (event.key == "p") {
                block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - transformCamera[0].getTransform().position[1], transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });
            }
        });

    });

    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
        child.isAttached("camera")
    );

    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

    SDK3DVerse.setMainCamera(firstPersonCamera);
}

async function Try(){
    var 
    return false;
}