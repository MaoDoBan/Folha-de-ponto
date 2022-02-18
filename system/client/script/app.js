import { app } from "./vue.js";
app.mount("#app");
import { socket } from "./socket.js";
socket.on("mensagem", texto => {
    console.log("Server me falou:", texto);
});
