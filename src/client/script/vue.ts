import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { Cargo } from "../../types/Cargo.js";
import { Funcionário } from "../../types/Funcionário.js";
import { LinhaPlanilhaPontos } from "../../types/Pontos.js";
import { checaAlteraçõesObs } from "./checaAlteraçõesNasObs.js";
import { listaObservações } from "./listaObservações.js";
import * as server from "./socket.js";


type ItemMenu = "Início" | "Cargos" | "Calendário" | "Logs";
const páginasNomeToClass = {
  "Início":     "#menu-inicio",
  "Cargos":     "#menu-cargos",
  "Calendário": "#menu-calendario",
  "Logs":       "#menu-logs"
};
type EntradasESaídas = "entrada1" | "saida1" | "entrada2" | "saida2" | "entrada3" | "saida3";
const entradasESaídas = [, "entrada1", "saida1", "entrada2", "saida2", "entrada3", "saida3"];//EntradasESaídas

function delay(msTime: number){
  return new Promise( resolve => setTimeout(resolve, msTime) );
};
const cargos = await server.postGetCargos();

export const app = createApp({
  data(){
    return {
      atual: {
        página: "Início",
        cargo: {id: 0, nome: "É"},
        funcionário: {id: 0, nome: "Jão", id_cargo: 0},
        mês: "03/2022",
      },
      input: {
        cargo: false,
        funcionário: false
      },
      cargos,
      funcionários: [],
      meses: [],
      planilha: {},
      totais: {},
      observações: {}
    };
  },

  methods: {
    clickItemMenu(próximaPágina: ItemMenu){
      if(this.atual.página == próximaPágina) return;

      const classPáginaAtual = páginasNomeToClass[this.atual.página as ItemMenu];
      if(classPáginaAtual){
        const botãoMenuPáginaAtual = document.querySelector(classPáginaAtual)!;
        botãoMenuPáginaAtual.classList.remove("ressaltado");
      }
      
      const próxima = document.querySelector(páginasNomeToClass[próximaPágina])!;
      próxima.classList.add("ressaltado");

      this.atual.página = próximaPágina;
    },

    async confirmarAddCargo(){
      const input = document.querySelector("#input-cargo") as HTMLInputElement;
      const resposta = await server.postAddCargo(input.value);

      if(resposta != "ok") return alert("Server negou registrar este cargo! Motivo: "+resposta);

      this.input.cargo = false;
      this.cargos = await server.postGetCargos();
    },
    async confirmarEditCargo(){
      const input = document.querySelector("#edit-cargo") as HTMLInputElement;
      if(input.value == this.atual.cargo.nome) return;

      const resposta = await server.postEditCargo(this.atual.cargo.id, input.value);
      if(resposta != "ok") return alert("Server negou editar este cargo! Motivo: "+resposta);

      this.cargos = await server.postGetCargos();
      this.atual.cargo.nome = input.value;
    },

    async clickCargo(cargo: Cargo){
      this.atual.cargo  = cargo;
      this.funcionários = await server.postGetFuncionários(cargo.id);

      this.atual.página = "Cargo";
      const itemMenuRessaltado = document.querySelector(".ressaltado");
      itemMenuRessaltado?.classList.remove("ressaltado");
    },

    async confirmarAddFuncionário(){
      const input = document.querySelector("#input-funcionário") as HTMLInputElement;
      const resposta = await server.postAddFuncionário(input.value, this.atual.cargo.id);

      if(resposta != "ok") return alert("Server negou registrar este funcionário! Motivo: "+resposta);

      this.input.funcionário = false;
      this.funcionários = await server.postGetFuncionários(this.atual.cargo.id);
    },
    async confirmarEditFuncionário(){
      const input = document.querySelector("#edit-funcionário") as HTMLInputElement;
      const resposta = await server.postEditFuncionário(this.atual.funcionário.id, input.value);

      if(resposta != "ok") return alert("Server negou editar este funcionário! Motivo: "+resposta);

      this.funcionários = await server.postGetFuncionários(this.atual.cargo.id);
      this.atual.funcionário.nome = input.value;
    },

    async clickFuncionário(funcionário: Funcionário){
      this.atual.funcionário = funcionário;
      
      this.meses = await server.postGetMeses();
      this.atual.mês = this.meses[this.meses.length - 1];

      const formulárioETotais = await server.postGetPontosFuncionário(funcionário.id, this.atual.mês);
      if(typeof formulárioETotais == "string") return alert("Erro: "+formulárioETotais);

      this.planilha    = formulárioETotais.planilhaPontos; //-console.log(this.planilha.length);
      this.totais      = formulárioETotais.totais;
      this.observações = listaObservações(this.planilha);
      
      this.atual.página = "Funcionário";
    },

    async clickMês(mês: string){
      this.atual.mês = mês;
      
      const formulárioETotais = await server.postGetPontosFuncionário(this.atual.funcionário.id, this.atual.mês);
      if(typeof formulárioETotais == "string") return alert("Erro: "+formulárioETotais);

      this.planilha    = formulárioETotais.planilhaPontos;
      this.totais      = formulárioETotais.totais;
      this.observações = listaObservações(this.planilha);
    },
    
    async enterPonto(event: Event, dia: number){
      const ponto = {...this.planilha[dia - 1]} as LinhaPlanilhaPontos;

      let contadorNovosHorários = 0;
      let input: HTMLInputElement;
      for(let i = 1; i <= 6; i++){
        input = document.querySelector("#i"+(dia*6+i)) as HTMLInputElement;
        if(input.value == "") continue;
        ponto[entradasESaídas[i] as EntradasESaídas] = input.value;
        contadorNovosHorários++;
      }
      if(contadorNovosHorários == 0) return;

      const resposta = await server.postSetPontoFuncionário(ponto, this.totais);
      if(typeof resposta == "string") return alert("Erro: "+resposta);

      this.planilha[dia - 1] = resposta.linha;
      this.totais = resposta.totais;

      const inputAtual = event.target as HTMLInputElement;
      const idPróximo = Number( inputAtual.id.slice(1) ) + 1;
      const próximoInput = document.querySelector("#i"+idPróximo) as HTMLInputElement;
      if(!próximoInput){
        inputAtual.blur();
        return;
      }
      próximoInput.focus();
    },

    async novaObservação(linha: LinhaPlanilhaPontos){
      console.log("nova obs");
      const deuErro = await checaAlteraçõesObs(this.observações, this.totais);
      if(deuErro) return;

      linha.observacao = linha.observacao || " "; //-console.log("linha:",linha, "na planilha:", this.planilha[linha.dia-1]);
      this.observações = listaObservações(this.planilha);
      //-console.log("obss:",this.observações);

      await delay(300);
      const novoInputObs = document.querySelector("#o"+linha.dia) as HTMLInputElement;
      novoInputObs.focus();
      novoInputObs.select();
    },
    async enterObservação(idObs: number){
      console.log("enter obs");
      const deuErro = await checaAlteraçõesObs(this.observações, this.totais);
      if(deuErro) return;

      const inputObs = document.querySelector("#o"+idObs) as HTMLInputElement;
      inputObs.blur();
    }
  }
});


    /*async clickFuncionários(){///
      console.log("Todos os funcionários");
      this.atual.página = "Funcionários";
    },*/