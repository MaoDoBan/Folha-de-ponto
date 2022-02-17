import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../types/socketio.js";

const app = express();
const httpServer = createServer(app);
const sockets = new Server(httpServer);


import { cleanDirPath } from "./cleanDirPath.js";
const clientRootPath = cleanDirPath(import.meta.url); console.log("rootPath: "+clientRootPath);

///TODO: tem que ver se vai usar o objeto app ou troca pelo httpServer

app.use(express.static(clientRootPath));
app.get("/", (request, response) => {
  response.sendFile(clientRootPath+"/index.html");
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});