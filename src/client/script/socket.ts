import { io, Socket } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { ServerToClientEvents, ClientToServerEvents } from "../../types/socketio.js";
import { Cargo } from "../../types/Cargo.js";
import { Funcionário } from "../../types/Funcionário.js";


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();


export function getCargos(): Promise<Cargo[]>{
  return new Promise(resolve => {
    socket.emit("getCargos");
    socket.once("sendCargos", cargos=>resolve(cargos));
  });
}
export function addCargo(nome: string): Promise<string>{
  return new Promise(resolve => {
    socket.emit("addCargo", nome);
    socket.once("resultAddCargo", status=>resolve(status));
  });
}
// export function editCargo(nome: string, id: number): Promise<string>{
//   return new Promise(resolve => {
//     socket.emit("editCargo", nome, id);
//     socket.once("resultEditCargo", status=>resolve(status));
//   });
// }

export function getFuncionários(): Promise<Funcionário[]>{
  return new Promise(resolve => {
    socket.emit("getFuncionários");
    socket.once("sendFuncionários", funcionários=>resolve(funcionários));
  });
}
export function addFuncionário(nomeFuncionário: string, idCargo: number): Promise<string>{
  return new Promise(resolve => {
    socket.emit("addFuncionário", nomeFuncionário, idCargo);
    socket.once("resultAddFuncionário", status=>resolve(status));
  });
}
// export function editFuncionário(nome: string, id: number): Promise<string>{
//   return new Promise(resolve => {
//     socket.emit("editFuncionário", nome, id);
//     socket.once("resultAddFuncionário", status=>resolve(status));
//   });
// }


// export function getMêsFuncionário(funcionário: string, mês: number, ano: number){
//   return new Promise(resolve => {
//     socket.emit("getMêsFuncionário", funcionário, mês, ano);
//     socket.once("mêsFuncionário",    data => resolve(data));
//   });
// }