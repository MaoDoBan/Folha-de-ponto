import { httpServer } from "./http.js";
import { iniciaSocketIo } from "./websocket.js";
iniciaSocketIo();
const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}.`);
});
