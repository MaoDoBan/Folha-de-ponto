import { initDatabase } from "./initDatabase.js";
const database = initDatabase();
export const dados = {
    database,
    sqlGetListaCargos: database.prepare("SELECT * FROM Cargos;"),
    sqlGetCargoDeId: database.prepare("SELECT * FROM Cargos WHERE id = ?;"),
    sqlGetCargoDeNome: database.prepare("SELECT * FROM Cargos WHERE nome = ?;"),
    sqlAddCargo: database.prepare("INSERT INTO Cargos(nome) VALUES(?);"),
    sqlEditCargo: database.prepare("UPDATE Cargos SET nome = ? WHERE id = ?"),
    taSemCargos() {
        const quantidadeDeCargos = database.prepare("SELECT count(id) FROM Cargos;").get();
        return quantidadeDeCargos["count(id)"] == 0;
    },
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
    },
    addCargo(nome) {
        nome = nome.trim();
        if (nome == "")
            return "vazio";
        const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
        if (jáTemEsteCargo)
            return "repetido";
        if (nome.includes(';'))
            return "contém ;";
        this.sqlAddCargo.run(nome);
        return "ok";
    },
    editCargo(id, nome) {
        nome = nome.trim();
        if (nome == "")
            return "vazio";
        const jáTemEsteCargo = this.sqlGetCargoDeNome.get(nome);
        if (jáTemEsteCargo)
            return "repetido";
        if (nome.includes(';'))
            return "contém ;";
        this.sqlEditCargo.run(nome, id);
        return "ok";
    },
    sqlGetListaFuncionários: database.prepare("SELECT * FROM Funcionarios WHERE id_cargo = ?;"),
    sqlGetFuncionárioDeId: database.prepare("SELECT * FROM Funcionarios WHERE id = ?;"),
    sqlGetFuncionárioDeNome: database.prepare("SELECT * FROM Funcionarios WHERE nome = ?;"),
    sqlAddFuncionário: database.prepare("INSERT INTO Funcionarios(nome, id_cargo) VALUES(?, ?);"),
    sqlEditFuncionário: database.prepare("UPDATE Funcionarios SET nome = ? WHERE id = ?"),
    getFuncionários(idCargo) {
        const funcionários = this.sqlGetListaFuncionários.all(idCargo);
        funcionários.sort((a, b) => {
            let nomeA = a.nome.toUpperCase();
            let nomeB = b.nome.toUpperCase();
            if (nomeA < nomeB)
                return -1;
            if (nomeA > nomeB)
                return 1;
            return 0; //nome igual
        });
        return funcionários;
    },
    addFuncionário(nome, idCargo) {
        nome = nome.trim();
        if (nome == "")
            return "vazio";
        const funcionárioExiste = this.sqlGetFuncionárioDeNome.get(nome);
        if (nome.includes(';'))
            return "contém ;";
        if (funcionárioExiste) {
            const cargo = this.sqlGetCargoDeId.get(funcionárioExiste.id_cargo);
            console.log("|||", funcionárioExiste, cargo);
            return `já existe um funcionário com o nome ${nome} no cargo ` + cargo.nome;
        }
        this.sqlAddFuncionário.run(nome, idCargo);
        return "ok";
    },
    editFuncionário(id, nome) {
        nome = nome.trim();
        if (nome == "")
            return "vazio";
        const funcionárioExiste = this.sqlGetFuncionárioDeNome.get(nome);
        if (nome.includes(';'))
            return "contém ;";
        if (funcionárioExiste) {
            const cargo = this.sqlGetCargoDeId.get(funcionárioExiste.id_cargo);
            return `já existe um funcionário com o nome ${nome} no cargo ` + cargo.nome;
        }
        this.sqlEditFuncionário.run(nome, id);
        return "ok";
    }
};
/*
bot.SQLsetUsuario = bot.sql.prepare("INSERT OR REPLACE INTO usuarios (user_id, msgs_pv, link, t_out_acesso_rpg)"+
                                                      " VALUES (@user_id, @msgs_pv, @link, @t_out_acesso_rpg);"),
bot.setUsuario = function(usu){ bot.SQLsetUsuario.run(usu); }
*/ 
