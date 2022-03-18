import { readFileSync } from "fs";
import { Config } from "../../types/Config.js";
import { initDatabase } from "./initDatabase.js";
import { Cargo } from "../../types/Cargo.js";
import { Funcionário } from "../../types/Funcionário.js";
import { PontosNoBanco } from "../../types/Pontos.js";
import { getMeses } from "./getMeses.js";
import { calculaPontos } from "./calculaPontos.js";


const database = initDatabase();
const config: Config = JSON.parse( readFileSync("config.json", "utf8") );

export const dados = {
  database,


  sqlGetListaCargos: database.prepare("SELECT * FROM Cargos;"),
  sqlGetCargoDeId  : database.prepare("SELECT * FROM Cargos WHERE id = ?;"),
  sqlGetCargoDeNome: database.prepare("SELECT * FROM Cargos WHERE nome = ?;"),
  sqlAddCargo      : database.prepare("INSERT INTO Cargos(nome) VALUES(?);"),
  sqlEditCargo     : database.prepare("UPDATE Cargos SET nome = ? WHERE id = ?"),
  
  taSemCargos(){
    const quantidadeDeCargos = database.prepare("SELECT count(id) FROM Cargos;").get();
    return quantidadeDeCargos["count(id)"] == 0;
  },
  getCargos(){
    const cargos: Cargo[] = this.sqlGetListaCargos.all();
    cargos.sort( (a, b)=>{
      let nomeA = a.nome.toUpperCase();
      let nomeB = b.nome.toUpperCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;//nome igual
    });
    return cargos;
  },
  addCargo(nome: string){
    nome = nome.trim();
    if(nome == "") return "vazio";

    const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
    if(jáTemEsteCargo)     return "repetido";
    if(nome.includes(';')) return "contém ;";
    
    this.sqlAddCargo.run(nome);
    return "ok";
  },
  editCargo(id: number, nome: string){
    nome = nome.trim();
    if(nome == "") return "vazio";

    const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
    if(jáTemEsteCargo)     return "repetido";
    if(nome.includes(';')) return "contém ;";

    this.sqlEditCargo.run(nome, id);
    return "ok";
  },


  sqlGetListaFuncionários: database.prepare("SELECT * FROM Funcionarios WHERE id_cargo = ?;"),
  sqlGetFuncionárioDeId  : database.prepare("SELECT * FROM Funcionarios WHERE id = ?;"),
  sqlGetFuncionárioDeNome: database.prepare("SELECT * FROM Funcionarios WHERE nome = ?;"),
  sqlAddFuncionário      : database.prepare("INSERT INTO Funcionarios(nome, id_cargo) VALUES(?, ?);"),
  sqlEditFuncionário     : database.prepare("UPDATE Funcionarios SET nome = ? WHERE id = ?"),

  getFuncionários(idCargo: number){
    const funcionários: Funcionário[] = this.sqlGetListaFuncionários.all(idCargo);
    funcionários.sort( (a, b)=>{
      let nomeA = a.nome.toUpperCase();
      let nomeB = b.nome.toUpperCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;//nome igual
    });
    return funcionários;
  },
  addFuncionário(nome: string, idCargo: number){
    nome = nome.trim();
    if(nome == "") return "vazio";

    const funcionárioExiste: Funcionário = this.sqlGetFuncionárioDeNome.get(nome);
    if(nome.includes(';')) return "contém ;";

    if(funcionárioExiste){
      const cargo = this.sqlGetCargoDeId.get(funcionárioExiste.id_cargo);
      return `já existe um funcionário com o nome ${nome} no cargo `+cargo.nome;
    }

    this.sqlAddFuncionário.run(nome, idCargo);
    return "ok";
  },
  editFuncionário(id: number, nome: string){
    nome = nome.trim();
    if(nome == "") return "vazio";

    const funcionárioExiste: Funcionário = this.sqlGetFuncionárioDeNome.get(nome);
    if(nome.includes(';')) return "contém ;";

    if(funcionárioExiste){
      const cargo = this.sqlGetCargoDeId.get(funcionárioExiste.id_cargo);
      return `já existe um funcionário com o nome ${nome} no cargo `+cargo.nome;
    }

    this.sqlEditFuncionário.run(nome, id);
    return "ok";
  },

  getMeses(){ return getMeses(config.mêsInicial); },


  sqlGetPontosFuncionário: database.prepare("SELECT * FROM FolhaDePonto WHERE id_funcionario = ? AND mes = ? AND ano = ?;"),

  getPontosFuncionário(idFuncionário: number, mêsAno: string){
    return calculaPontos(
      idFuncionário,
      mêsAno,
      config,
      (mês: number, ano: number)=>this.sqlGetPontosFuncionário.all(idFuncionário, mês, ano)
    );
  }
}


export type Dados = typeof dados;