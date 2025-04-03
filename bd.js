const mysql = require("mysql2/promise");

async function conectarBD() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "travel",
    });
    global.connection = connection;
    return global.connection;
}

async function buscarUsuario(usuario) {
    const connection = await conectarBD();
    const sql = "select * from usuario where usuEmail=? and usuSenha=?;";
    const [usuarioEncontrado] = await connection.query(sql, [usuario.email, usuario.senha,]);
    return usuarioEncontrado && usuarioEncontrado.length > 0 ? usuarioEncontrado[0] : {};
}

// async function buscarPerfis(usuario){
//     const connextion = await conectarBD();
//     const sql = "select * from perfis where usuCodigo=?;";
//     const [perfisEncontrados] = await connextion.query(sql, [usuario]);

//     return perfisEncontrados;
// }

conectarBD();

module.exports = { buscarUsuario };
