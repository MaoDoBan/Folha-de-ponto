import { Cargo } from "./Cargo";
import { Funcionário } from "./Funcionário";


export interface ServerToClientEvents {
  sendCargos:            (cargos: Cargo[]) => void;
  resultAddCargo:        (status: string) => void;
  resultEditCargo:       (status: string) => void;
  sendFuncionários:      (funcionários: Funcionário[]) => void;
  resultAddFuncionário:  (status: string) => void;
  resultEditFuncionário: (status: string) => void;
  mêsFuncionário:        (dados: any) => void;
}

export interface ClientToServerEvents {
  getCargos:         () => void;
  addCargo:          (nome: string) => void;
  editCargo:         (id: number, nome: string) => void;
  getFuncionários:   (idCargo: number) => void;
  addFuncionário:    (nomeFuncionário: string, idCargo: number) => void;
  editFuncionário:   (id: number, nome: string) => void;
  getMêsFuncionário: (funcionário: string, mês: number, ano: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}


  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  // mensagem: (texto: string) => void;