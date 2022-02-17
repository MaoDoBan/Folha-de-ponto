import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const sockets = new Server(httpServer);
import { cleanDirPath } from "./cleanDirPath.js";
const clientRootPath = cleanDirPath(import.meta.url);
console.log("rootPath: " + clientRootPath);
app.use(express.static(clientRootPath));
app.get("/", (request, response) => {
    response.sendFile(clientRootPath + "/index.html");
});
export { httpServer, sockets };
