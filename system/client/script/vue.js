import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const páginasNomeToClass = {
    "Início": ".mi-inicio",
    "Cargos": ".mi-cargos",
    "Calendário": ".mi-calendario"
};
export const app = createApp({
    data() {
        return {
            páginaAtual: "Início",
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
        clickItemMenu(próximaPágina) {
            if (this.páginaAtual == próximaPágina)
                return;
            const atual = document.querySelector(páginasNomeToClass[this.páginaAtual]);
            const próxima = document.querySelector(páginasNomeToClass[próximaPágina]);
            atual.classList.remove("mi-selecionado");
            próxima.classList.add("mi-selecionado");
            this.páginaAtual = próximaPágina;
        },
        clickCargo(cargo) {
            console.log(cargo + " foi clicado");
        },
        async clickFuncionário(funcionário) {
            ///desabilitar os botão de funcionário, pra habilitar só depois
            // this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
            //this.dias = ;
            this.funcionário = funcionário;
        },
    }
});
