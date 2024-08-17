const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ajuste o caminho conforme necessário

const Caixa = sequelize.define(
    "Caixa",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "caixas", // opcional: define explicitamente o nome da tabela
        timestamps: false, // desabilita createdAt e updatedAt
    }
);

module.exports = Caixa;
