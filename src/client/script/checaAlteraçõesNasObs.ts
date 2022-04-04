import { Observação } from "../../types/Observação";
import { LinhaPlanilhaPontos, Totais } from "../../types/Pontos";
import * as server from "./socket.js";


export async function checaAlteraçõesObs(observações: {[id: number]: Observação}, totais: Totais){
  let deuErro = false;
  let idInput: number;
  let linha: LinhaPlanilhaPontos;
  const inputsObs = document.querySelectorAll(".texto-obs") as NodeListOf<HTMLInputElement>;
  for(let inputObs of inputsObs){
    idInput = Number(inputObs.id.slice(1));
    linha = observações[idInput].linha;
    if(inputObs.value != linha.observacao){
      linha.observacao = inputObs.value;
      const resposta = await server.postSetPontoFuncionário(linha, totais);
      if(typeof resposta == "string"){
        deuErro = true;
        alert("Erro: "+resposta);
      }
    }
  }
  return deuErro;
}

  
  /*
  for(let linha of planilha){
    if(linha.)
    document.querySelector("#i"+idPróximo);
  }
  */