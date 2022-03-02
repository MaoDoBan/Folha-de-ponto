import DatabaseConstructor from "better-sqlite3";
const database = new DatabaseConstructor("BancoDeDados.db");
const sqlStringCheckTableExists = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = ?;";
export function initDatabase() {
    const tabelaCargos = database.prepare(sqlStringCheckTableExists).get('Cargos');
    if (!tabelaCargos['count(*)']) {
        database.prepare("CREATE TABLE Cargos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);").run();
        console.log("Banco de dados: criei tabela Cargos");
        database.pragma("synchronous = 1");
        database.pragma("journal_mode = wal");
    }
    const tabelaFuncionários = database.prepare(sqlStringCheckTableExists).get('Funcionarios');
    if (!tabelaFuncionários['count(*)']) {
        database.prepare("CREATE TABLE Funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, id_cargo INTEGER NOT NULL REFERENCES Cargos(id));").run();
        console.log("Banco de dados: criei tabela Funcionarios");
    }
    const tabelaFolhaDePonto = database.prepare(sqlStringCheckTableExists).get('FolhaDePonto');
    if (!tabelaFolhaDePonto['count(*)']) {
        database.prepare("CREATE TABLE FolhaDePonto (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, id_funcionario INTEGER NOT NULL REFERENCES Funcionarios(id), data TEXT, " +
            "entrada1 TEXT, saida1 TEXT, entrada2 TEXT, saida2 TEXT, entrada3 TEXT, saida3 TEXT, observacao TEXT" +
            ");").run();
        database.prepare("CREATE UNIQUE INDEX idx_funcionario_data ON FolhaDePonto(id_funcionario, data);").run();
        console.log("Banco de dados: criei tabela FolhaDePonto");
    }
    return database;
}
