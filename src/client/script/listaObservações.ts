import { Observação } from "../../types/Observação";
import { LinhaPlanilhaPontos } from "../../types/Pontos";


const diaSemanaCompleto = {
  "DOM": "Domingo",
  "SEG": "Segunda",
  "TER": "Terça",
  "QUA": "Quarta",
  "QUI": "Quinta",
  "SEX": "Sexta",
  "SAB": "Sábado"
} as {[i: string]: string};

export function listaObservações(planilha: LinhaPlanilhaPontos[]){
  const observações: {[id: number]: Observação} = {};
  let contador = 1;
  for(let linha of planilha){
    if(linha.observacao){
      observações[linha.dia] = {
        id: contador,
        label: contador+`) ${diaSemanaCompleto[linha.diaNaSemana]} ${linha.dia}/`+linha.mes,
        linha
      };
      contador ++;
    }
  }
  return observações;
}