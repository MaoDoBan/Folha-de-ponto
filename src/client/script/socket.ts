import { io, Socket } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { ServerToClientEvents, ClientToServerEvents } from "../../types/socketio.js";
import { Cargo } from "../../types/Cargo.js";
import { Funcionário } from "../../types/Funcionário.js";
import { LinhaETotais, PlanilhaETotais, LinhaPlanilhaPontos, Totais } from "../../types/Pontos.js";


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();


export function postGetCargos(): Promise<Cargo[]>{
  return new Promise(resolve => {
    socket.emit("getCargos");
    socket.once("sendCargos", cargos => resolve(cargos));
  });
}
export function postAddCargo(nome: string): Promise<string>{
  return new Promise(resolve => {
    socket.emit("addCargo", nome);
    socket.once("resultAddCargo", status => resolve(status));
  });
}
export function postEditCargo(id: number, nome: string): Promise<string>{
  return new Promise(resolve => {
    socket.emit("editCargo", id, nome);
    socket.once("resultEditCargo", status => resolve(status));
  });
}

export function postGetFuncionários(idCargo: number): Promise<Funcionário[]>{
  return new Promise(resolve => {
    socket.emit("getFuncionários",  idCargo);
    socket.once("sendFuncionários", funcionários => resolve(funcionários));
  });
}
export function postAddFuncionário(nomeFuncionário: string, idCargo: number): Promise<string>{
  return new Promise(resolve => {
    socket.emit("addFuncionário", nomeFuncionário, idCargo);
    socket.once("resultAddFuncionário", status => resolve(status));
  });
}
export function postEditFuncionário(id: number, nome: string): Promise<string>{
  return new Promise(resolve => {
    socket.emit("editFuncionário", id, nome);
    socket.once("resultEditFuncionário", status => resolve(status));
  });
}

export function postGetMeses(): Promise<string[]>{
  return new Promise(resolve => {
    socket.emit("getMeses");
    socket.once("meses", meses => resolve(meses));
  });
}

///TODO: isso abaixo é placeholder
export function postGetPontosFuncionário(idFuncionário: number, mêsAno: string): Promise<PlanilhaETotais | string>{
  return new Promise(resolve => {
    socket.emit("getPontosFuncionário", idFuncionário, mêsAno);
    socket.once("pontosFuncionário",    dados => resolve(dados));
  });
}

export function postSetPontoFuncionário(ponto: LinhaPlanilhaPontos, totais: Totais): Promise<LinhaETotais | string>{
  return new Promise(resolve => {
    socket.emit("setPontoFuncionário", ponto, totais);
    socket.once("confirmaPonto",       dados => resolve(dados));
  });
}

