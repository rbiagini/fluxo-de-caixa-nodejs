const { Sequelize } = require("sequelize");

const d = process.env.DATABASE || "3001";

// Substitua com as suas credenciais de banco de dados
const sequelize = new Sequelize(
    process.env.DATABASE || "fluxo_de_caixa",
    process.env.DATABASE_USER || "root",
    process.env.DATABASE_PASS || "Adndko9873",
    {
        host: process.env.DATABASE_HOST || "localhost",
        dialect: "mysql", // ou 'postgres', 'sqlite', etc.
    }
);

module.exports = sequelize;
// module.exports = {Sequelize, sequelize} // o require deve virar uma variável para ser exportada
