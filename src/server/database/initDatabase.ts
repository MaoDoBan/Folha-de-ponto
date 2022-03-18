import DatabaseConstructor, { Database } from "better-sqlite3";


const database: Database = new DatabaseConstructor("BancoDeDados.db");

//SELECT name FROM sqlite_master WHERE type='table';
const sqlStringCheckTableExists = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = ?;";

export function initDatabase(){
  const tabelaExiste = database.prepare(sqlStringCheckTableExists);

  const tabelaCargos = tabelaExiste.get('Cargos');
  if(!tabelaCargos['count(*)']){
    database.prepare("CREATE TABLE Cargos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);").run();
    console.log("Banco de dados: criei tabela Cargos");

    database.pragma("synchronous = 1");
    database.pragma("journal_mode = wal");
  }

  const tabelaFuncionários = tabelaExiste.get('Funcionarios');
  if(!tabelaFuncionários['count(*)']){
    database.prepare("CREATE TABLE Funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, id_cargo INTEGER NOT NULL REFERENCES Cargos(id));").run();
    console.log("Banco de dados: criei tabela Funcionarios");
  }

  const tabelaFolhaDePonto = tabelaExiste.get('FolhaDePonto');
  if(!tabelaFolhaDePonto['count(*)']){
    database.prepare(
      "CREATE TABLE FolhaDePonto ("+
        "id_funcionario INTEGER NOT NULL REFERENCES Funcionarios(id), dia INTEGER, mes INTEGER, ano INTEGER, "+
        "entrada1 TEXT, saida1 TEXT, entrada2 TEXT, saida2 TEXT, entrada3 TEXT, saida3 TEXT, observacao TEXT, "+
        "CONSTRAINT id PRIMARY KEY (id_funcionario, dia, mes, ano)"+
      ");"
    ).run();
    database.prepare("CREATE UNIQUE INDEX idx_funcionario_mes_ano ON FolhaDePonto(id_funcionario, mes, ano);").run();
    console.log("Banco de dados: criei tabela FolhaDePonto");
  }

  return database;
}
