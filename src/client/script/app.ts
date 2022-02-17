import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
//import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

//import { io, Socket } from "socket.io-client";

//console.log(io);


//import {bah} from "./renomear.js";


const semana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
let i_semana = 1;
const dias: any[] = [];/// ARRUMAR
for(let i=1; i<=28; i++){
  dias.push({
    numero: i, semana: semana[i_semana], t1entrada: "", t1saida: "", intervalo: "0:00",
    t2entrada: "", t2saida: "", t3entrada: "", t3saida: "",
    total: "", total50: "", total100: "", csabado: "", obs: ""
  });
  i_semana = i_semana == 6 ? 0 : i_semana+1;
  console.log("i_semana "+i_semana);
}

// interface App {
//   page: string,
//   funcionario: string,
//   clickItemMenu: Function,
// };

const app = createApp({//Vue.
  data(){
    return {
      page: "Funcionário",//"Início",
      funcionario: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mes: "02/2022",
      dias,
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
    clickItemMenu(event: { target: { innerText: any; }; }){
      this.page = event.target.innerText;
    },
    clickCargo(event: { target: { innerText: string; }; }){
      console.log(event.target.innerText + " foi clicado");
    },
    clickFuncionario(event: { target: { innerText: any; }; }){
      this.funcionario = event.target.innerText;
    },
  }
});

app.mount("#app");

