import { sockets } from "./http.js";
import { fevereiro } from "./calculaDia.js"; ////
const clientesConectados = [];
export function iniciaSocketIo(dados) {
    sockets.on("connection", client => {
        console.log("> Um novo cliente se conectou: ", client.id);
        clientesConectados.push(client);
        const índice = clientesConectados.length;
        client.on("disconnect", function (data) {
            console.log(`O client ${índice} desconectou!`);
            clientesConectados.splice(índice, 1);
        });
        client.on("getCargos", () => {
            /// se não existir funcionário com o id informado ????? isso é pro server?
            client.emit("sendCargos", dados.getCargos());
        });
        client.on("addCargo", nome => {
            client.emit("resultAddCargo", dados.addCargo(nome));
        });
        client.on("editCargo", (id, nome) => {
            client.emit("resultEditCargo", dados.editCargo(id, nome));
        });
        client.on("getFuncionários", idCargo => {
            client.emit("sendFuncionários", dados.getFuncionários(idCargo));
        });
        client.on("addFuncionário", (nomeFuncionário, idCargo) => {
            client.emit("resultAddFuncionário", dados.addFuncionário(nomeFuncionário, idCargo));
        });
        client.on("editFuncionário", (id, nome) => {
            client.emit("resultEditFuncionário", dados.editFuncionário(id, nome));
        });
        // client.on("", ()=>{
        //   ;
        // });
        ///placeholder abaixo
        client.on("getMêsFuncionário", (funcionário, mês, ano) => {
            console.log(`O ${client.id} ta querendo os dados do ${funcionário} do mês ` + mês + "/" + ano);
            client.emit("mêsFuncionário", fevereiro);
        });
    });
}
;
