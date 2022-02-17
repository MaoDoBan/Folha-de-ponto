import { app } from "./vue.js";
app.mount("#app");


import { socket } from "./socket.js";
socket.on("noArg", () => {
  console.log("Server cutucou eu u.u");
});