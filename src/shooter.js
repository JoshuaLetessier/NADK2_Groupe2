const amoSceneUUID = "284b32ab-56b5-4fbc-a9c8-2d5999505093";

export async function shoot(player)
{
    
    document.addEventListener("click", async function(event) {
       
        if (event.button === 0 ) {
            console.log("Clic gauche détecté !");

            /*const firstPersonController = (await player.getChildren())[0];
            const camera = (await firstPersonController.getChildren())[1];
            var transform = { position : [0, 0, 0], orientation : [0, 0, 0, 1], scale : [1, 1, 1] }
            transform = await camera.getGlobalTransform();*/
           
            const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
            const transform = transformCamera[0].getTransform();
          console.log(transform);

            const amoTemplate = new SDK3DVerse.EntityTemplate();
            amoTemplate.attachComponent("scene_ref", {value: amoSceneUUID});

            const amoEntity = await amoTemplate.instantiateTransientEntity(
                "bullet",
                null,
                true,
            );
            
            amoEntity.setComponent('local_transform', { possition: [transform], scale : [0.3,0.3,0.3]});
            SDK3DVerse.engineAPI.playAnimationSequence("fbb6ca25-f82e-4e25-b338-1e6ab98503c4", {seekOffset: 0}, amoEntity);

            //SDK3DVerse.engineAPI.deleteEntities({amoEntity});
        }

    });
    
}