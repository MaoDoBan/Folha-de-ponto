import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getMêsFuncionário } from "./socket.js";


type ItemMenu = "Início" | "Cargos" | "Calendário";
const páginasNomeToClass = {
  "Início":     "#menu-inicio",
  "Cargos":     "#menu-cargos",
  "Calendário": "#menu-calendario"
};

export const app = createApp({
  data(){
    return {
      páginaAtual: "Início",//,"Funcionário"
      funcionário: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mês: "02/2022",
      dias: {},
      bah: "a",
      cargos: [
        { nome: "Manutenção" },
        { nome: "Motorista C" },
        { nome: "Motorista D" },
        { nome: "Motorista E" },
        { nome: "Operador de Retro" },
        { nome: "Operadores Diversos" },
        { nome: "Supervisor Operacional" },
        { nome: "Assistente de Supervisor Operacional" },
        { nome: "Funcionário" }
      ]
    };
  },
  methods: {
    clickItemMenu(próximaPágina: ItemMenu){
      if(this.páginaAtual == próximaPágina) return;

      const atual   = document.querySelector(páginasNomeToClass[this.páginaAtual as ItemMenu])!;
      const próxima = document.querySelector(páginasNomeToClass[próximaPágina])!;

      atual.classList.remove("ressaltado");
      próxima.classList.add("ressaltado");
      this.páginaAtual = próximaPágina;
    },
    async clickCargo(cargo: string){
      console.log(cargo + " foi clicado");
      if(cargo == "Funcionário"){
        this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
        this.páginaAtual = cargo;
      }
    },
    async clickFuncionário(funcionário: string){
      ///desabilitar os botão de funcionário, pra habilitar só depois
      // this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
      //this.dias = ;
      this.funcionário = funcionário;
    },
  }
});