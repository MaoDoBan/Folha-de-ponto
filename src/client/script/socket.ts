import { io, Socket } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { ServerToClientEvents, ClientToServerEvents } from "../../types/socketio.js";


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export function getMêsFuncionário(funcionário: string, mês: number, ano: number){
  return new Promise(resolve => {
    socket.emit("getMêsFuncionário", funcionário, mês, ano);
    socket.once( "mêsFuncionário", data => resolve(data) );
  });
}