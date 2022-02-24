import { httpServer } from "./http.js";


import { initDatabase } from "./database/initDatabase.js";
import { DB } from "./database/DB.js";
const db = new DB(initDatabase());

console.log("cargos: ", db.getCargos());
const bah = db.addCargo("Motoristaço PA"); console.log("bah:",bah);
console.log("cargos: ", db.getCargos());
db.editCargo(1, "Motorista X");
console.log("cargos: ", db.getCargos());


import { iniciaSocketIo } from "./websocket.js";
iniciaSocketIo();

const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});