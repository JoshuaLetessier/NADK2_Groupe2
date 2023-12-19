

class Taking{
    FullHand = new Boolean(false);
}


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

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);
       
        document.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
              // Traitement de l'événement
              setInterval(function () {
                follow(block);
              }, 10);
            }
          });
       
    });


    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.


    Take();


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


async function follow(object) {
         // Calcule la position du joueur
       // console.log("follow");
       // console.log(object);
        //const transformObject = object.getGlobalTransform(); 
        //console.log(transformObject);

        const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
        //console.log(await transformCamera[0].getTransform())

        object.setGlobalTransform(transformCamera[0].getTransform());
        console.log(object.getGlobalTransform());
}
//document.addEventListener("keydown",  );

async function Take() {

    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);

        document.addEventListener("keydown", function (event) {
            if (event.key == "a" && Taking.FullHand == false) {
                // Traitement de l'�v�nement
                setInterval(function () {
                    block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - 1, transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });

                }, 10);
            }
            else if (event.key == "p") {
                block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - transformCamera[0].getTransform().position[1], transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });
            }
        });

    });
}

