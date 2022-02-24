import { Database, Statement } from "better-sqlite3";

export class DB{
  sqlGetListaCargos: Statement<any[]>;
  sqlAddCargo:       Statement<any[]>;
  sqlEditCargo:      Statement<any[]>;

  constructor(database: Database){
    this.sqlGetListaCargos = database.prepare("SELECT * FROM Cargos");
    this.sqlAddCargo       = database.prepare("INSERT INTO Cargos(nome) VALUES(?);");
    this.sqlEditCargo      = database.prepare("UPDATE Cargos SET nome = ? WHERE id = ?");
  }
  
  getCargos(){ return this.sqlGetListaCargos.all(); }
  addCargo(nome: string){ return this.sqlAddCargo.run(nome); }
  editCargo(id: number, nome: string){ return this.sqlEditCargo.run(nome, id); }
}






/*
bot.SQLsetUsuario = bot.sql.prepare("INSERT OR REPLACE INTO usuarios (user_id, msgs_pv, link, t_out_acesso_rpg)"+
                                                      " VALUES (@user_id, @msgs_pv, @link, @t_out_acesso_rpg);");
bot.setUsuario = function(usu){ bot.SQLsetUsuario.run(usu); }
*/