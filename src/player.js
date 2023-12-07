export async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();

    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
    //EntityTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

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
    const block = await SDK3DVerse.engineAPI.findEntitiesByEUID({ value: charCtlSceneUUID });

    const meshUUID = { value: charCtlSceneUUID };
    const meshRefComponent = { value: meshUUID, submeshIndex: 0 };


    SDK3DVerse.engineAPI.onEnterTrigger((player, block) => {
        console.log(player/*.components.debug_name.value*/, " entered trigger of ", block.components.debug_name.value);

/*        block.attachComponent({ value: "84a6f2d5-f1c9-45ac-aecc-787f5577278b" }, meshRefComponent);

        block.isAttached("camera");*/
        block.setComponent('local_transform', { position: [player.components.local_transform.position[1], player.components.local_transform.position[2], 0] });

/*        block.attachComponent({ value: charCtlSceneUUID }, meshRefComponent);*/
        //block.engineAPI.isAttached("Dieux Quentin");

    });

    console.log(player, "Cheh");

    console.log("Salut");


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




async function follow(object, bool) {
  // Calcule la position du joueur
  if(bool === true)
      {
        console.log("follow");
        const transformObject = object.getGlobalTransform();
        console.log(transformObject);

        const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
        console.log(await transformCamera[0].getTransform())

        object.setGlobalTransform(transformCamera[0].getTransform());
        console.log(object.getGlobalTransform());
      }
    }

