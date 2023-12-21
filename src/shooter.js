import { updateBulletDisplay, getBulletCout } from "./displayController.js";
const amoSceneUUID = "284b32ab-56b5-4fbc-a9c8-2d5999505093";

export async function shoot(player)
{
    
    document.addEventListener("click", async function(event) {
       
        if (event.button === 0 ) {
            console.log("Clic gauche détecté !");

            const transformCamera = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
            const transform = transformCamera[0].getTransform();
            const amoTemplate = new SDK3DVerse.EntityTemplate();
            
            amoTemplate.attachComponent("scene_ref", {value: amoSceneUUID});

            const amoEntity = await amoTemplate.instantiateTransientEntity(
                "bullet",
                null,
                true,
            );

            await decrementBullets();
            amoEntity.setComponent('local_transform', { possition: [transform], scale : [0.3,0.3,0.3]});

            
            SDK3DVerse.engineAPI.playAnimationSequence("fbb6ca25-f82e-4e25-b338-1e6ab98503c4", {seekOffset: 0}, amoEntity);
            await delay(1800);
            SDK3DVerse.engineAPI.deleteEntities([amoEntity]);
        }
    });
}

function decrementBullets() {
    return new Promise((resolve) => {
        var bulletCount = getBulletCout();
        console.log(bulletCount);
        if (bulletCount > 0) {
            bulletCount--;
            updateBulletDisplay();
        }
        console.log(bulletCount);
        resolve();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    updateBulletDisplay();
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}