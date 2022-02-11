const app = Vue.createApp({
  data(){
    return {
      page: "Funcionário",//"Início",
      funcionario: "Ele Mesmo",
      cargo: "Motorista Teste",//remover isso, colocar alguma estrutura melhor
      mes: "02/2022",
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
    clickItemMenu(event){
      this.page = event.target.innerText;
    },
    clickCargo(event){
      console.log(event.target.innerText + " foi clicado");
    },
    clickFuncionario(event){
      this.funcionario = event.target.innerText;
    }
  },
  computed: {
    getDias(funcionario, mes){
      console.log("getDias "+funcionario+" "+mes);
      return []
      //   {
      //     dia: 1, semana: "TER", t1entrada: "", t1saida: "", intervalo: "0:00", t2entrada: "", t2saida: "", t3entrada: "", t3saida: "",
      //     total: "", total50: "", total100: "", csabado: "", obs: ""
      //   }
      // ];
    }
  }
});

app.mount("#app");