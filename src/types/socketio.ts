export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  mensagem: (texto: string) => void;
  bah: (dados: any) => void;
  mêsFuncionário: (dados: any) => void;
}

export interface ClientToServerEvents {
  oi: () => void;
  nah: () => number;
  mensagem: (texto: string) => void;
  bah: (dados: any) => void;
  getMêsFuncionário: (funcionário: string, mês: number, ano: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}