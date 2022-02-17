import { sockets } from "./http.js";


export function iniciaSocketIo(){
  sockets.on("connection", client => {
    console.log("Entrou um intruso: ", client.id);
    client.emit("noArg");
  });
};