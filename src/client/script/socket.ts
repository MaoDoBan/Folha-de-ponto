import { io, Socket } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { ServerToClientEvents, ClientToServerEvents } from "../../types/socketio.js";


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();