import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { addCargo, getCargos } from "./socket.js";
const páginasNomeToClass = {
    "Início": "#menu-inicio",
    "Cargos": "#menu-cargos",
    "Calendário": "#menu-calendario"
};
const cargos = await getCargos();
export const app = createApp({
    data() {
        return {
            páginaAtual: "Início",
            funcionário: "Ele Mesmo",
            cargo: "Motorista Teste",
            mês: "02/2022",
            dias: {},
            input: { cargo: false },
            cargos
        };
    },
    methods: {
        clickItemMenu(próximaPágina) {
            if (this.páginaAtual == próximaPágina)
                return;
            const atual = document.querySelector(páginasNomeToClass[this.páginaAtual]);
            const próxima = document.querySelector(páginasNomeToClass[próximaPágina]);
            atual.classList.remove("ressaltado");
            próxima.classList.add("ressaltado");
            this.páginaAtual = próximaPágina;
        },
        async clickCargo(id) {
            console.log(`cargo ${id} foi clicado`);
        },
        async confirmarAddCargo() {
            const input = document.querySelector("#input-cargo");
            const resposta = await addCargo(input.value);
            if (resposta == "ok") {
                this.input.cargo = false;
                this.cargos = await getCargos();
                return;
            }
            alert("Server negou registrar este cargo! Motivo: " + resposta);
        },
        async clickFuncionário(funcionário) {
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
/*
        { nome: "Manutenção" },
        { nome: "Motorista C" },
        { nome: "Motorista D" },
        { nome: "Motorista E" },
        { nome: "Operador de Retro" },
        { nome: "Operadores Diversos" },
        { nome: "Supervisor Operacional" },
        { nome: "Assistente de Supervisor Operacional" },
        { nome: "Funcionário" }
*/ 
