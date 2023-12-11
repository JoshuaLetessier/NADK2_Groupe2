
export async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    // Passing null as parent entity will instantiate our new entity at the root
    // of the main scene.
    const parentEntity = null;
    // Setting this option to true will ensure that our entity will be destroyed
    // when the client is disconnected from the session, making sure we don't
    // leave our 'dead' player body behind.
    const deleteOnClientDisconnection = true;
    // We don't want the player to be saved forever in the scene, so we
    // instantiate a transient entity.
    // Note that an entity template can be instantiated multiple times.
    // Each instantiation results in a new entity.

    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
        "Josh", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-3, 0, 0] })

    //const player = await SDK3DVerse.engineAPI.findEntitiesByEUID("9ce6d264-7ae4-49f8-8b91-2f89aeafc5bb");
    
    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("779b6587-629c-428d-aa8a-423c9709dc94");

    //detection trigger enter
    if(_onExitTrigger(playerSceneEntity, block))
    {
        SDK3DVerse.engineAPI.unselectAllEntities();
    }
    else
    {
       _onEnterTrigger(playerSceneEntity, block);
       console.log(block);
    }

    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.
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

    // Finally set the first person camera as the main camera.
    SDK3DVerse.setMainCamera(firstPersonCamera);
}


async function follow(object) {
  // Calcule la position du joueur
       // console.log("follow");

        const transformObject = object.getGlobalTransform(); 
        //console.log(transformObject);

        const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
        //console.log(await transformCamera[0].getTransform())

        object.setGlobalTransform(transformCamera[0].getTransform());
        //console.log(object.getGlobalTransform());
}

function detectInput()
{
    
}

function _onEnterTrigger(playerSceneEntity, block)
{
    SDK3DVerse.engineAPI.onEnterTrigger(async (playerSceneEntity, block) => {
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);

        //const key = SDK3DVerse.getKey("z");
        //console.log(key); 
        //console.log("Appuie P");
        const key = "";
        var event = new KeyboardEvent("keydown", {key:key});
        handleKeyDown(event);
        document.dispatchEvent(event);
        //console.log(block);
    });
}

function _onExitTrigger(playerSceneEntity, block)
{
    console.log('onexit');
    SDK3DVerse.engineAPI.onExitTrigger(async(playerSceneEntity, block) => {
        return false;
    })
}

async function handleKeyDown(event) {
    
    var keyPressed = event.key;
    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID("779b6587-629c-428d-aa8a-423c9709dc94");

    console.log("Touche pressée : " + keyPressed);
    if (keyPressed == "Enter") { //récupérer object
        console.log(block);
        //console.log("P pressed");
        setInterval(function () {
            follow(block);
        }, 10);
    }
    else if(keyPressed == "p") //pose du bloque
    {

    }
}
document.addEventListener("keydown", handleKeyDown);