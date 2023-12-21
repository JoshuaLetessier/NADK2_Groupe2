export async function findSession(SceneUUID, userToken){
    const sessions = await SDK3DVerse.findSessions({ sceneUUID: SceneUUID, userToken: userToken });

    return sessions;
}
