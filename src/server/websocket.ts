import { sockets, Socket } from "./http.js";
import { Dados } from "./database/Dados.js";
import { fevereiro } from "./calculaDia.js";////


const clientesConectados: Socket[] = [];

export function iniciaSocketIo(dados: Dados){
  sockets.on("connection", client => {
    console.log("> Um novo cliente se conectou: ", client.id);
    

    clientesConectados.push(client);
    const índice = clientesConectados.length;
  
    client.on("disconnect", function(data){
      console.log(`O client ${índice} desconectou!`);
      clientesConectados.splice(índice, 1);
    });

    client.on("getCargos", ()=>{
      client.emit("sendCargos", dados.getCargos());
    });
    client.on("addCargo", nome => {
      client.emit("resultAddCargo", dados.addCargo(nome));
    });
    // client.on("editCargo", ()=>{
    //   
    //   client.emit("resultEditCargo", );
    // });

    client.on("getFuncionários", ()=>{
      client.emit("sendFuncionários", dados.getFuncionários());
    });
    // client.on("addFuncionário", ()=>{
    //   //checar se o funcionário não é duplicado
    //   client.emit("resultAddFuncionário", );
    // });
    // client.on("editFuncionário", ()=>{
    //   //checar se o funcionário não é duplicado
    //   client.emit("resultEditFuncionário", );
    // });

    // client.on("", ()=>{
    //   ;
    // });


    ///placeholder abaixo
    client.on("getMêsFuncionário", (funcionário: string, mês: number, ano: number)=>{
      console.log(`O ${client.id} ta querendo os dados do ${funcionário} do mês `+mês+"/"+ano);
      client.emit("mêsFuncionário", fevereiro);
    });
  });
};


