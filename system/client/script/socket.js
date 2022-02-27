import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export const socket = io();
export function getCargos() {
    return new Promise(resolve => {
        socket.emit("getCargos");
        socket.once("sendCargos", cargos => resolve(cargos));
    });
}
export function addCargo(nome) {
    return new Promise(resolve => {
        socket.emit("addCargo", nome);
        socket.once("resultAddCargo", status => resolve(status));
    });
}
// export function editCargo(nome: string, id: number): Promise<string>{
//   return new Promise(resolve => {
//     socket.emit("editCargo", nome, id);
//     socket.once("resultEditCargo", status=>resolve(status));
//   });
// }
export function getFuncionários(idCargo) {
    return new Promise(resolve => {
        socket.emit("getFuncionários", idCargo);
        socket.once("sendFuncionários", funcionários => resolve(funcionários));
    });
}
export function addFuncionário(nomeFuncionário, idCargo) {
    return new Promise(resolve => {
        socket.emit("addFuncionário", nomeFuncionário, idCargo);
        socket.once("resultAddFuncionário", status => resolve(status));
    });
}
// export function editFuncionário(nome: string, id: number): Promise<string>{
//   return new Promise(resolve => {
//     socket.emit("editFuncionário", nome, id);
//     socket.once("resultAddFuncionário", status=>resolve(status));
//   });
// }
///TODO: isso abaixo é placeholder
export function getMêsFuncionário(funcionário, mês, ano) {
    return new Promise(resolve => {
        socket.emit("getMêsFuncionário", funcionário, mês, ano);
        socket.once("mêsFuncionário", data => resolve(data));
    });
}
