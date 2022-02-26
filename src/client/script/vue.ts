import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { addCargo, getCargos } from "./socket.js";


type ItemMenu = "Início" | "Cargos" | "Calendário";
const páginasNomeToClass = {
  "Início":     "#menu-inicio",
  "Cargos":     "#menu-cargos",
  "Calendário": "#menu-calendario"
};

const cargos = await getCargos();

export const app = createApp({
  data(){
    return {
      páginaAtual: "Início",//,"Funcionário"
      funcionário: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mês: "02/2022",
      dias: {},
      input: {cargo: false},
      cargos
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

    async confirmarAddCargo(){
      const input = document.querySelector("#input-cargo") as HTMLInputElement;
      const resposta = await addCargo(input.value);

      if(resposta != "ok"){
        alert("Server negou registrar este cargo! Motivo: "+resposta);
        return;
      }

      this.input.cargo = false;
      this.cargos = await getCargos();
    },

    async clickCargo(id: number){
      console.log(`cargo ${id} foi clicado`);
    },

    async clickFuncionário(funcionário: string){
      ///desabilitar os botão de funcionário, pra habilitar só depois
      // this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
      //this.dias = ;
      this.funcionário = funcionário;
    },
  }
});


      // if(cargo == "Funcionário"){
      //   this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
      //   this.páginaAtual = cargo;
      // }

/*        { nome: "Manutenção" },
        { nome: "Motorista C" },
        { nome: "Motorista D" },
        { nome: "Motorista E" },
        { nome: "Operador de Retro" },
        { nome: "Operadores Diversos" },
        { nome: "Supervisor Operacional" },
        { nome: "Assistente de Supervisor Operacional" },
        { nome: "Funcionário" }*/