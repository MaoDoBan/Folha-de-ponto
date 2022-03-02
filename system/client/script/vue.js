import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import * as server from "./socket.js";
const páginasNomeToClass = {
    "Início": "#menu-inicio",
    "Cargos": "#menu-cargos",
    "Calendário": "#menu-calendario",
    "Logs": "#menu-logs"
};
const cargos = await server.postGetCargos();
export const app = createApp({
    data() {
        return {
            atual: {
                página: "Início",
                funcionário: { id: 0, nome: "" },
                cargo: { id: 0, nome: "" },
                mês: "02/2022",
            },
            dias: {},
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
        async confirmarAddCargo() {
            const input = document.querySelector("#input-cargo");
            const resposta = await server.postAddCargo(input.value);
            if (resposta != "ok")
                return alert("Server negou registrar este cargo! Motivo: " + resposta);
            this.input.cargo = false;
            this.cargos = await server.postGetCargos();
        },
        async confirmarEditCargo() {
            const input = document.querySelector("#edit-cargo");
            if (input.value == this.atual.cargo.nome)
                return;
            const resposta = await server.postEditCargo(this.atual.cargo.id, input.value);
            if (resposta != "ok")
                return alert("Server negou editar este cargo! Motivo: " + resposta);
            this.cargos = await server.postGetCargos();
            this.atual.cargo.nome = input.value;
        },
        async clickCargo(cargo) {
            this.atual.cargo = cargo;
            this.funcionários = await server.postGetFuncionários(cargo.id);
            this.atual.página = "Cargo";
            const itemMenuRessaltado = document.querySelector(".ressaltado");
            itemMenuRessaltado?.classList.remove("ressaltado");
        },
        async confirmarAddFuncionário() {
            const input = document.querySelector("#input-funcionário");
            const resposta = await server.postAddFuncionário(input.value, this.atual.cargo.id);
            if (resposta != "ok")
                return alert("Server negou registrar este funcionário! Motivo: " + resposta);
            this.input.funcionário = false;
            this.funcionários = await server.postGetFuncionários(this.atual.cargo.id);
        },
        async confirmarEditFuncionário() {
            const input = document.querySelector("#edit-funcionário");
            const resposta = await server.postEditFuncionário(this.atual.funcionário.id, input.value);
            if (resposta != "ok")
                return alert("Server negou editar este funcionário! Motivo: " + resposta);
            this.funcionários = await server.postGetFuncionários(this.atual.cargo.id);
            this.atual.funcionário.nome = input.value;
        },
        async clickFuncionário(funcionário) {
            console.log(funcionário, " foi clicado");
            this.dias = await server.postGetMêsFuncionário("Ele Mesmo", 2, 2022); ////TODO: remover ou mover isso depois
            this.funcionário = funcionário;
            this.atual.página = "Funcionário";
        },
        async clickFuncionários() {
            console.log("Todos os funcionários");
            this.atual.página = "Funcionários"; ////
        }
    }
});
// if(cargo == "Funcionário"){
//   this.dias = await getMêsFuncionário("Ele Mesmo", 2, 2022);
//   this.atual.página = cargo;
// }
