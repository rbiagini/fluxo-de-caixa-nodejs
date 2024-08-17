const sequelize = require("./config/database"); // ajuste o caminho conforme necessário
const Caixa = require("./models/caixa"); // ajuste o caminho conforme necessário

(async () => {
    console.log("Entrando...");
    try {
        await sequelize.sync({ force: false }); // force: true recria a tabela
        console.log("A tabela Caixa foi sincronizada com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar a tabela Caixa:", error);
    } finally {
        await sequelize.close();
    }
})();
