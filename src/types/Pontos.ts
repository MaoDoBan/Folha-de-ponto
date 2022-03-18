export interface PontosNoBanco{
  id_funcionario: number,
  dia: number,
  mes: number,
  ano: number,
  entrada1: string,
  saida1:   string,
  entrada2: string,
  saida2:   string,
  entrada3: string,
  saida3:   string,
  observacao: string
}

export interface LinhaPlanilhaPontos extends PontosNoBanco{
  diaNaSemana: string,
  intervalo: string,
  total: string,
  total50: string,
  total100: string,
  compSábado: string
}