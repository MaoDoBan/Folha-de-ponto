import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { addCargo, getCargos, getFuncionários, getMêsFuncionário } from "./socket.js";
import { Cargo } from "../../types/Cargo.js";
import { Funcionário } from "../../types/Funcionário.js";


type ItemMenu = "Início" | "Cargos" | "Calendário";
const páginasNomeToClass = {
  "Início":     "#menu-inicio",
  "Cargos":     "#menu-cargos",
  "Calendário": "#menu-calendario",
  "Logs":       "#menu-logs"
};

const cargos = await getCargos();
const dias = await getMêsFuncionário("Ele Mesmo", 2, 2022); ////TODO: remover ou mover isso depois

export const app = createApp({
  data(){
    return {
      páginaAtual: "Início",//,"Funcionário"
      funcionário: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mês: "02/2022",
      dias,//dias: {},
      input: {
        cargo: false,
        funcionário: false
      },
      cargos,
      funcionários: []
    };
  },

  methods: {
    clickItemMenu(próximaPágina: ItemMenu){
      if(this.páginaAtual == próximaPágina) return;

      const classPáginaAtual = páginasNomeToClass[this.páginaAtual as ItemMenu];
      if(classPáginaAtual){
        const atual = document.querySelector(classPáginaAtual)!;
        atual.classList.remove("ressaltado");
      }
      
      const próxima = document.querySelector(páginasNomeToClass[próximaPágina])!;
      próxima.classList.add("ressaltado");

      this.páginaAtual = próximaPágina;
    },

    async clickCargo(cargo: Cargo){
      const funcionários = await getFuncionários(cargo.id);
      console.log(cargo, "\n", funcionários);
      //se não existir funcionário com o id informado
      ;
      this.páginaAtual = "Cargo";
      const itemMenuRessaltado = document.querySelector(".ressaltado")!;
      itemMenuRessaltado.classList.remove("ressaltado");
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
    
    async clickFuncionários(){
      console.log("Todos os funcionários");
      this.páginaAtual = "Funcionário";////
    },

    async clickFuncionário(funcionário: Funcionário){
      console.log(funcionário," foi clicado");
      ///desabilitar os botão de funcionário, pra habilitar só depois
      // this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
      //this.dias = ;
      //this.funcionário = funcionário;
    },

    confirmarAddFuncionário(){
      console.log("confirmar add funcionário");
    }
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