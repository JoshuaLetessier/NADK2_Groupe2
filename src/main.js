async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: "public_VgFOTMCc8tJRIuf2",
    sceneUUID: "f8eb08e3-c82f-4775-9099-9df75861dc16",
    canvas: document.getElementById("display-canvas"),
    viewportProperties: {
      defaultControllerType: SDK3DVerse.controller_type.orbit,
    },
  });
}

window.addEventListener('load', InitApp());
