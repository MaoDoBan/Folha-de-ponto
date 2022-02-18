import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getMêsFuncionário } from "./socket.js";


export const app = createApp({
  data(){
    return {
      página: "Início",//,"Funcionário"
      funcionário: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mês: "02/2022",
      dias: {},
      cargos: [
        { nome: "Manutenção" },
        { nome: "Motorista C" },
        { nome: "Motorista D" },
        { nome: "Motorista E" },
        { nome: "Operador de Retro" },
        { nome: "Operadores Diversos" },
        { nome: "Supervisor Operacional" }
      ]
    };
  },
  methods: {
    async clickItemMenu(página: string){
      if(página != "Funcionário"){
        this.página = página;
        return;
      }
      ///desabilitar os botão de funcionário, pra habilitar só depois
      this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
      this.página = página;
    },
    clickCargo(cargo: string){
      console.log(cargo + " foi clicado");
    },
    clickFuncionário(funcionário: string){
      //this.dias = ;
      this.funcionário = funcionário;
    },
  }
});