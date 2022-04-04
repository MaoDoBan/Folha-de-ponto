import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export const socket = io();
export function postGetCargos() {
    return new Promise(resolve => {
        socket.emit("getCargos");
        socket.once("sendCargos", cargos => resolve(cargos));
    });
}
export function postAddCargo(nome) {
    return new Promise(resolve => {
        socket.emit("addCargo", nome);
        socket.once("resultAddCargo", status => resolve(status));
    });
}
export function postEditCargo(id, nome) {
    return new Promise(resolve => {
        socket.emit("editCargo", id, nome);
        socket.once("resultEditCargo", status => resolve(status));
    });
}
export function postGetFuncionários(idCargo) {
    return new Promise(resolve => {
        socket.emit("getFuncionários", idCargo);
        socket.once("sendFuncionários", funcionários => resolve(funcionários));
    });
}
export function postAddFuncionário(nomeFuncionário, idCargo) {
    return new Promise(resolve => {
        socket.emit("addFuncionário", nomeFuncionário, idCargo);
        socket.once("resultAddFuncionário", status => resolve(status));
    });
}
export function postEditFuncionário(id, nome) {
    return new Promise(resolve => {
        socket.emit("editFuncionário", id, nome);
        socket.once("resultEditFuncionário", status => resolve(status));
    });
}
export function postGetMeses() {
    return new Promise(resolve => {
        socket.emit("getMeses");
        socket.once("meses", meses => resolve(meses));
    });
}
///TODO: isso abaixo é placeholder
export function postGetPontosFuncionário(idFuncionário, mêsAno) {
    return new Promise(resolve => {
        socket.emit("getPontosFuncionário", idFuncionário, mêsAno);
        socket.once("pontosFuncionário", dados => resolve(dados));
    });
}
export function postSetPontoFuncionário(ponto, totais) {
    return new Promise(resolve => {
        socket.emit("setPontoFuncionário", ponto, totais);
        socket.once("confirmaPonto", dados => resolve(dados));
    });
}
