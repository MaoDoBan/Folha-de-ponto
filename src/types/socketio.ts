import { Cargo } from "./Cargo";
import { Funcionário } from "./Funcionário";
import { LinhaETotais, PlanilhaETotais, LinhaPlanilhaPontos, Totais } from "./Pontos";


export interface ServerToClientEvents{
  sendCargos:            (cargos: Cargo[]) => void;
  resultAddCargo:        (status: string) => void;
  resultEditCargo:       (status: string) => void;
  sendFuncionários:      (funcionários: Funcionário[]) => void;
  resultAddFuncionário:  (status: string) => void;
  resultEditFuncionário: (status: string) => void;
  meses:                 (meses: string[]) => void;
  pontosFuncionário:     (dados: PlanilhaETotais | string) => void;
  confirmaPonto:         (dados: LinhaETotais | string) => void;
}

export interface ClientToServerEvents{
  getCargos:              () => void;
  addCargo:               (nome: string) => void;
  editCargo:              (id: number, nome: string) => void;
  getFuncionários:        (idCargo: number) => void;
  addFuncionário:         (nomeFuncionário: string, idCargo: number) => void;
  editFuncionário:        (id: number, nome: string) => void;
  getMeses:               () => void;
  getPontosFuncionário:   (idFuncionário: number, mêsAno: string) => void;
  setPontoFuncionário:    (ponto: LinhaPlanilhaPontos, totais: Totais) => void;
}

export interface InterServerEvents{
  ping: () => void;
}

export interface SocketData{
  name: string;
  age: number;
}


  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  // mensagem: (texto: string) => void;