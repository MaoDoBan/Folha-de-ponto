import { Cargo } from "./Cargo";
import { Funcionário } from "./Funcionário";


export interface ServerToClientEvents {
  sendCargos:      (cargos: Cargo[]) => void;
  resultAddCargo:  (status: string) => void;
  resultEditCargo: (status: string) => void;
  sendFuncionários:      (funcionários: Funcionário[]) => void;
  resultAddFuncionário:  (status: string) => void;
  resultEditFuncionário: (status: string) => void;
  // mêsFuncionário: (dados: any) => void;
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  // mensagem: (texto: string) => void;
}

export interface ClientToServerEvents {
  getCargos: () => void;
  addCargo:  (nome: string) => void;
  editCargo: (nome: string, id: number) => void;
  getFuncionários: () => void;
  addFuncionário:  (nomeFuncionário: string, idCargo: number) => void;
  editFuncionário: (nome: string, id: number) => void;
  // getMêsFuncionário: (funcionário: string, mês: number, ano: number) => void;
  // mensagem: (texto: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}