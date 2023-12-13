

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
        "Dieux Quentin", // <-----------------------------------------------------------------------------------    RENAME Here / Renomage ici
        parentEntity,
        deleteOnClientDisconnection
    );

    playerSceneEntity.setComponent('local_transform', { position: [-3, 0, 0] })

    const player = await SDK3DVerse.engineAPI.findEntitiesByNames("Dieux Quentin");
    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: "779b6587-629c-428d-aa8a-423c9709dc94" });


    SDK3DVerse.engineAPI.onEnterTrigger(async (player, block) => {
        console.log(player/*.components.debug_name.value*/, " entered trigger of ", block.components.debug_name.value);

        console.log("appuyer sur A pour prendre l'objet");
        //surbrillance de l'object
        SDK3DVerse.engineAPI.selectEntities([block]);
    });


    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
        child.isAttached("camera")

    );

    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

    SDK3DVerse.setMainCamera(firstPersonCamera);
}   

async function Drop(object) {

    //object.setGlobalTransform(transformCamera[0].getTransform());

    object.local_transform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - 2, transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });

    //console.log(object.getGlobalTransform());
}

async function handleKeyDown(event) {

    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: "779b6587-629c-428d-aa8a-423c9709dc94" });
    const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();

    var keyPressed = event.key;

    if (keyPressed == "a") { //récupérer object
        setInterval(function () {

            block.setGlobalTransform({ position: [transformCamera[0].getTransform().position[0], transformCamera[0].getTransform().position[1] - 1, transformCamera[0].getTransform().position[2]], orientation: [0, 0, 0, 1], scale: [0.5, 0.5, 0.5] });

        }, 10);
    }
    else if (keyPressed == "p") //pose du bloque
    {
        Drop(block);
    }
}
document.addEventListener("keydown", handleKeyDown);