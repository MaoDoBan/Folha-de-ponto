export class Dados {
    constructor(database) {
        this.database = database;
        this.sqlGetListaCargos = database.prepare("SELECT * FROM Cargos;");
        this.sqlGetCargoDeId = database.prepare("SELECT * FROM Cargos WHERE id = ?;");
        this.sqlGetCargoDeNome = database.prepare("SELECT * FROM Cargos WHERE nome = ?;");
        this.sqlAddCargo = database.prepare("INSERT INTO Cargos(nome) VALUES(?);");
        this.sqlEditCargo = database.prepare("UPDATE Cargos SET nome = ? WHERE id = ?");
        this.sqlGetListaFuncionários = database.prepare("SELECT * FROM Funcionarios;");
        this.sqlGetFuncionárioDeId = database.prepare("SELECT * FROM Funcionarios WHERE id = ?;");
        this.sqlGetFuncionárioDeNome = database.prepare("SELECT * FROM Funcionarios WHERE nome = ?;");
        this.sqlAddFuncionário = database.prepare("INSERT INTO Funcionarios(nome, cargo_id) VALUES(?, ?);");
        this.sqlEditFuncionário = database.prepare("UPDATE Funcionarios SET nome = ? WHERE id = ?");
    }
    getCargos() {
        const cargos = this.sqlGetListaCargos.all();
        cargos.sort((a, b) => {
            let nomeA = a.nome.toUpperCase();
            let nomeB = b.nome.toUpperCase();
            if (nomeA < nomeB)
                return -1;
            if (nomeA > nomeB)
                return 1;
            return 0; //nome igual
        });
        return cargos;
    }
    addCargo(nome) {
        const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
        if (jáTemEsteCargo)
            return "repetido";
        if (nome.includes(';'))
            return "contém ;";
        this.sqlAddCargo.run(nome);
        return "ok";
    }
    editCargo(id, nome) {
        const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
        if (jáTemEsteCargo)
            return "repetido";
        if (nome.includes(';'))
            return "contém ;";
        this.sqlEditCargo.run(nome, id);
        return "ok";
    }
}
/*
bot.SQLsetUsuario = bot.sql.prepare("INSERT OR REPLACE INTO usuarios (user_id, msgs_pv, link, t_out_acesso_rpg)"+
                                                      " VALUES (@user_id, @msgs_pv, @link, @t_out_acesso_rpg);");
bot.setUsuario = function(usu){ bot.SQLsetUsuario.run(usu); }
*/ 
