export interface PontosNoBanco{
  id: number,
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

export interface Totais{
  total50:    string,
  total100:   string,
  compSábado: string
}
export interface TotaisNum{
  total50:    number,
  total100:   number,
  compSábado: number
}

export interface LinhaETotais{
  linha: LinhaPlanilhaPontos,
  totais: Totais
}

export interface PlanilhaETotais{
  planilhaPontos: LinhaPlanilhaPontos[],
  totais: Totais
}