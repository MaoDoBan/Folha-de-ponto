import { httpServer } from "./http.js";


import { initDatabase } from "./database/initDatabase.js";
import { Dados } from "./database/Dados.js";
const dados = new Dados(initDatabase());

// const bah = dados.database.prepare("SELECT * FROM Cargos WHERE nome = ?;").get('Pagode');
// console.log("bah:",bah)

//dados.addCargo("Manutenção");
// console.log("cargos: ", db.getCargos());
// const bah = dados.addCargo("Manutenção"); console.log("bah:",bah);
// console.log("cargos: ", db.getCargos());
//dados.editCargo(2, "Motorista C");
// console.log("cargos: ", db.getCargos());


import { iniciaSocketIo } from "./websocket.js";
iniciaSocketIo(dados);

const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});