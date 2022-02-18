import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getMêsFuncionário } from "./socket.js";
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
        async clickItemMenu(página) {
            if (página != "Funcionário") {
                this.página = página;
                return;
            }
            ///desabilitar os botão de funcionário, pra habilitar só depois
            this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
            console.log("\nserá?:", this.dias);
            this.página = página;
        },
        clickCargo(cargo) {
            console.log(cargo + " foi clicado");
        },
        clickFuncionário(funcionário) {
            //this.dias = ;
            this.funcionário = funcionário;
        },
    }
});
