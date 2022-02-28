import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { addCargo, getCargos, getFuncionários, getMêsFuncionário } from "./socket.js";
const páginasNomeToClass = {
    "Início": "#menu-inicio",
    "Cargos": "#menu-cargos",
    "Calendário": "#menu-calendario",
    "Logs": "#menu-logs"
};
const cargos = await getCargos();
const dias = await getMêsFuncionário("Ele Mesmo", 2, 2022); ////TODO: remover ou mover isso depois
export const app = createApp({
    data() {
        return {
            atual: {
                página: "Início",
                funcionário: "Ele Mesmo",
                cargo: "Motorista Teste",
                mês: "02/2022",
            },
            dias,
            input: {
                cargo: false,
                funcionário: false
            },
            cargos,
            funcionários: []
        };
    },
    methods: {
        clickItemMenu(próximaPágina) {
            if (this.atual.página == próximaPágina)
                return;
            const classPáginaAtual = páginasNomeToClass[this.atual.página];
            if (classPáginaAtual) {
                const botãoMenuPáginaAtual = document.querySelector(classPáginaAtual);
                botãoMenuPáginaAtual.classList.remove("ressaltado");
            }
            const próxima = document.querySelector(páginasNomeToClass[próximaPágina]);
            próxima.classList.add("ressaltado");
            this.atual.página = próximaPágina;
        },
        async clickCargo(cargo) {
            const funcionários = await getFuncionários(cargo.id);
            console.log(cargo, "\n", funcionários);
            //se não existir funcionário com o id informado
            ;
            this.atual.página = "Cargo";
            const itemMenuRessaltado = document.querySelector(".ressaltado");
            itemMenuRessaltado.classList.remove("ressaltado");
        },
        async confirmarAddCargo() {
            const input = document.querySelector("#input-cargo");
            const resposta = await addCargo(input.value);
            if (resposta != "ok") {
                alert("Server negou registrar este cargo! Motivo: " + resposta);
                return;
            }
            this.input.cargo = false;
            this.cargos = await getCargos();
        },
        async clickFuncionários() {
            console.log("Todos os funcionários");
            this.atual.página = "Funcionário"; ////
        },
        async clickFuncionário(funcionário) {
            console.log(funcionário, " foi clicado");
            ///desabilitar os botão de funcionário, pra habilitar só depois
            // this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
            //this.dias = ;
            //this.funcionário = funcionário;
        },
        confirmarAddFuncionário() {
            console.log("confirmar add funcionário");
        }
    }
});
// if(cargo == "Funcionário"){
//   this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
//   this.atual.página = cargo;
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
