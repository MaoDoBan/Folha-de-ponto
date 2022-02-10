const app = Vue.createApp({
  data(){
    return {
      page: "Início",
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
    cliqueItemMenu(event){
      this.page = event.target.innerText;
    }
  }
});

app.mount("#app");