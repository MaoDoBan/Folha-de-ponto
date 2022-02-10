const app = Vue.createApp({
  data(){
    return {
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
  methods: {}
});

app.mount("#app");