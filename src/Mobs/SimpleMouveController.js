const mobsIUUD = "725373e2-8f06-4928-b232-65e217c01e1c";
const zoneIUUD = "cfe4b9b6-74ff-4522-ae6e-380d7b64d84f";

const speed = 1;

let lastTimestamp = 0;

export function startMobsLoop() {

    requestAnimationFrame(mobsLoop);
}

async function mobsLoop(timestamp) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Converti le temps en secondes
    const mobsEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID(mobsIUUD);
    const zoneEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID(zoneIUUD);//a redeclarer en haut

    moveInTriggerZone(deltaTime, mobsEntity, zoneEntity);

    lastTimestamp = timestamp;

    requestAnimationFrame(mobsLoop);//tout les rafraichissements de la fenetre


}

export async function moveInTriggerZone(deltaTime, mobsEntity, zoneEntity) {
    if (mobsEntity.length > 0) {
        const localTransform = mobsEntity[0].getGlobalTransform().position;

        // Calcul du déplacement en fonction de la vitesse et du temps
         const newPosition = [
             localTransform[0] + speed ,
             localTransform[1],
             localTransform[2] + speed
         ];

        //console.log(newPosition);

        mobsEntity[0].setGlobalTransform({ position: newPosition });

        SDK3DVerse.engineAPI.onExitTrigger(async (zoneEntity, mobsEntity) => {
            console.log("exit");
            //collision(mobsEntity);
        });
        SDK3DVerse.engineAPI.onEnterTrigger(async (zoneEntity, mobsEntity) => {
            console.log("enter");
            //collision(mobsEntity);
        });
    }
}

async function collision(mobsEntity)
{
    var newAngle = Math.floor(Math.random() * (0-360+1));
    const newPosition = [
        localTransform[0] + speed * deltaTime * Math.sin(newAngle),
        localTransform[1],
        localTransform[2] + speed * deltaTime * Math.sin(newAngle)
    ];

    mobsEntity[0].setGlobalTransform({ position: newPosition });
}
