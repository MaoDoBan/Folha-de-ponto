import { sockets } from "./http.js";
import { fevereiro } from "./calculaDia.js";
const clientesConectados = [];
export function iniciaSocketIo() {
    sockets.on("connection", client => {
        console.log("> Um novo cliente se conectou: ", client.id);
        clientesConectados.push(client);
        const índice = clientesConectados.length;
        client.emit("mensagem", `você é o ${índice} client que conectou`);
        client.on("disconnect", function (data) {
            console.log(`O client ${índice} desconectou!`);
            clientesConectados.splice(índice, 1);
        });
        client.on("mensagem", texto => {
            if (texto != "manda") {
                return console.log("Recebi uma fofoca aqui: " + texto);
            }
            client.emit("bah", fevereiro);
            console.log("enviei fevereiro");
        });
        client.on("getMêsFuncionário", (funcionário, mês, ano) => {
            console.log(`O ${client.id} ta querendo os dados do ${funcionário} do mês ` + mês + "/" + ano);
            client.emit("mêsFuncionário", fevereiro);
        });
    });
}
;
