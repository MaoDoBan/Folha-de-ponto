import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
export const app = createApp({
    data() {
        return {
            página: "Início",
            funcionário: "Ele Mesmo",
            cargo: "Motorista Teste",
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
        clickItemMenu(página) {
            this.página = página;
        },
        clickCargo(cargo) {
            console.log(cargo + " foi clicado");
        },
        clickFuncionário(funcionário) {
            this.funcionário = funcionário;
        },
    }
});
