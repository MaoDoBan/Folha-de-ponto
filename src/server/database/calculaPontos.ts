import { Config } from "../../types/Config.js";
import { LinhaPlanilhaPontos, PlanilhaETotais, PontosNoBanco, Totais, TotaisNum } from "../../types/Pontos.js";
import { tempoToMinutos, minutosToTempo } from "../tempo.js";
import { totaisToString } from "../totaisToString.js";


const semana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export function calculaPontos(
  id_funcionario: number, mêsAno: string, config: Config,
  getPontos: (mês: number, ano: number)=>PontosNoBanco[]
): PlanilhaETotais | string{
  const partes = mêsAno.split("/");
  const mes = Number(partes.shift());
  const ano = Number(partes.shift());
  if(isNaN(mes) || isNaN(ano)) return "o mês e ano informados são inválidos!";

  const pontosNoBanco: PontosNoBanco[] = getPontos(mes, ano);
  const totaisNum: TotaisNum = {
    total50: 0,
    total100: 0,
    compSábado: 0
  };

  const planilhaPontos: LinhaPlanilhaPontos[] = [];
  for(let pontosNoDia of pontosNoBanco){
    planilhaPontos[pontosNoDia.dia - 1] = geraLinhaPlanilha(pontosNoDia, config, totaisNum);
  }

  let numDiaNaSemana = new Date(ano, mes-1, 1).getDay() - 1;

  const dataFinal = new Date(ano, mes, 1);
  dataFinal.setHours(-1);
  const comprimentoMês = dataFinal.getDate();

  for(let dia = 1; dia <= comprimentoMês; dia++){
    numDiaNaSemana = numDiaNaSemana < 6 ? numDiaNaSemana + 1 : 0;

    if(planilhaPontos[dia - 1]){
      planilhaPontos[dia - 1].diaNaSemana = semana[numDiaNaSemana];
      continue;
    }

    planilhaPontos[dia - 1] = geraLinhaPlanilha(
      {id_funcionario, dia, mes, ano} as PontosNoBanco,
      config, totaisNum, semana[numDiaNaSemana]
    );
  }
  //-planilhaPontos.shift();//remove o primeiro item (i 0), que é vazio
  //-console.log("length",planilhaPontos.length);//"planilhaPontos",planilhaPontos,

  const totais = totaisToString(totaisNum);
  return {planilhaPontos, totais};
}

function geraLinhaPlanilha(pontos: PontosNoBanco, config: Config, totais: TotaisNum, diaNaSemana = "-"): LinhaPlanilhaPontos{
  const tempoStr = {
    entrada1: pontos.entrada1 ?? "",
    saida1:   pontos.saida1   ?? "",
    entrada2: pontos.entrada2 ?? "",
    saida2:   pontos.saida2   ?? "",
    entrada3: pontos.entrada3 ?? "",
    saida3:   pontos.saida3   ?? "",
  } as {[i: string]: string};

  const tempoMinutos: {[i: string]: number} = {};
  for(let momento in tempoStr){
    tempoMinutos[momento] = tempoStr[momento] == "" ? -1 : tempoToMinutos(tempoStr[momento]);
  }
  tempoMinutos.total = tempoMinutos.saida1 + tempoMinutos.saida2 + tempoMinutos.saida3 - tempoMinutos.entrada1 - tempoMinutos.entrada2 - tempoMinutos.entrada3;
  tempoMinutos.total50    = tempoMinutos.total == 0 ? 0 : tempoMinutos.total   - tempoToMinutos(config.fatorTotal50);
  tempoMinutos.total100   = tempoMinutos.total == 0 ? 0 : tempoMinutos.total   - tempoToMinutos(config.fatorTotal100); //PERGUNTAR
  tempoMinutos.compSábado = tempoMinutos.total == 0 ? 0 : tempoMinutos.total50 - tempoToMinutos(config.fatorCompensaçãoSábado);

  //totais.total   += tempoMinutos.total; //PERGUNTAR
  totais.total50    += tempoMinutos.total50;
  totais.total100   += tempoMinutos.total100; //PERGUNTAR
  totais.compSábado += tempoMinutos.compSábado;

  const linha = {
    ...tempoStr,
    id: pontos.id ?? -1,
    id_funcionario: pontos.id_funcionario,
    dia: pontos.dia,
    mes: pontos.mes,
    ano: pontos.ano,
    diaNaSemana,
    intervalo:  minutosToTempo(tempoMinutos.entrada2 - tempoMinutos.saida1),
    total:      minutosToTempo(tempoMinutos.total),
    total50:    minutosToTempo(tempoMinutos.total50),
    total100:   minutosToTempo(tempoMinutos.total100), //PERGUNTAR
    compSábado: minutosToTempo(tempoMinutos.compSábado),
    observacao: pontos.observacao ?? ""
  } as LinhaPlanilhaPontos;
  return linha;
}