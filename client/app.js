const semana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
let i_semana = 1;
const dias = [];
for(let i=1; i<=28; i++){
  dias.push({
    numero: i, semana: semana[i_semana], t1entrada: "", t1saida: "", intervalo: "0:00",
    t2entrada: "", t2saida: "", t3entrada: "", t3saida: "",
    total: "", total50: "", total100: "", csabado: "", obs: ""
  });
  i_semana = i_semana == 6 ? 0 : i_semana+1;
  console.log("i_semana "+i_semana);
}

const app = Vue.createApp({
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
    clickItemMenu(event){
      this.page = event.target.innerText;
    },
    clickCargo(event){
      console.log(event.target.innerText + " foi clicado");
    },
    clickFuncionario(event){
      this.funcionario = event.target.innerText;
    },
  },
  /*computed: {
    getDias(){//funcionario, mes
      //console.log("getDias "+funcionario+" "+mes);
      const semana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
      let i_semana = 2;
      const dias = [];
      for(let i=1; i<=28; i++){
        dias.push({
          dia: i, semana: semana[i_semana], t1entrada: "", t1saida: "", intervalo: "0:00",
          t2entrada: "", t2saida: "", t3entrada: "", t3saida: "",
          total: "", total50: "", total100: "", csabado: "", obs: ""
        });
        i_semana = i_semana == 6 ? 0 : i_semana++;
      }
      return dias;
      //   {
      //     dia: 1, semana: "TER", t1entrada: "", t1saida: "", intervalo: "0:00", t2entrada: "", t2saida: "", t3entrada: "", t3saida: "",
      //     total: "", total50: "", total100: "", csabado: "", obs: ""
      //   }
      // ];
    }
  }*/
});

app.mount("#app");