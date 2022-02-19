import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export const socket = io();
export function getMêsFuncionário(funcionário, mês, ano) {
    return new Promise(resolve => {
        socket.emit("getMêsFuncionário", funcionário, mês, ano);
        socket.once("mêsFuncionário", data => resolve(data));
    });
}
