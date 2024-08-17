const { Sequelize } = require("sequelize");

// Substitua com as suas credenciais de banco de dados
const sequelize = new Sequelize("fluxo_de_caixa", "root", "Adndko9873", {
    host: "localhost",
    dialect: "mysql", // ou 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
// module.exports = {Sequelize, sequelize} // o require deve virar uma variável para ser exportada
