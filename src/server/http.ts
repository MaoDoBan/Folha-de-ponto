import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../types/socketio.js";

const app = express();
const httpServer = createServer(app);
const sockets = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);


import { cleanDirPath } from "./cleanDirPath.js";
const clientRootPath = cleanDirPath(import.meta.url); console.log("rootPath: "+clientRootPath);

app.use(express.static(clientRootPath));
app.get("/", (request, response) => {
  response.sendFile(clientRootPath+"/index.html");
});

export { httpServer, sockets, Socket };