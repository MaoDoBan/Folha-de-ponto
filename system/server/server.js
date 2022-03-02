import { httpServer } from "./http.js";
import { dados } from "./database/Dados.js";
if (dados.taSemCargos()) { //inicializando cargos
    const cargos = ["Manutenção", "Motorista C", "Motorista D", "Motorista E", "Operador de Retro", "Operadores Diversos", "Supervisor Operacional"];
    console.log("Adicionando cargos ao banco de dados:", cargos);
    for (let cargo of cargos) {
        dados.addCargo(cargo);
    }
}
import { iniciaSocketIo } from "./websocket.js";
iniciaSocketIo(dados);
const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`);
});
