var express = require("express");
var router = express.Router();
var Caixa = require("../models/caixa"); // Ajuste o caminho conforme necessário

/* GET caixas page. */
router.get("/caixas", async function (req, res, next) {
    try {
        const extrato = await Caixa.findAll();

        const receitas = extrato
            .filter((extrato) => extrato.status === 1)
            .reduce((sum, extrato) => sum + extrato.valor, 0);

        const despesas = extrato
            .filter((extrato) => extrato.status === 0)
            .reduce((sum, extrato) => sum + extrato.valor, 0);

        const valor_total = receitas - despesas;

        res.send({ extrato }); // Manda so o extrato
        /*res.send({
            extrato,
            valor_total,
            receitas,
            despesas,
        }); */
    } catch (error) {
        res.send(error).status(500); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

router.delete("/caixas/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const lancamento = await Caixa.findByPk(id);

        if (!lancamento) {
            return res.send({ mensagem: "Não existe esse registro" }).status(404);
        }
        // Tenta encontrar e excluir o registro com o ID fornecido
        await lancamento.destroy();

        // Redireciona para a página principal após a exclusão
        res.send({}).status(204);
    } catch (error) {
        // Em caso de erro, encaminha o erro para o próximo middleware de erro
        return res.send({ mensagem: "Erro ao excluir o registro" }).status(500);
    }
});

// Rota para processar o formulário e cadastrar um novo item
router.post("/caixas", async function (req, res, next) {
    try {
        const { tipo, valor, status } = req.body;

        // Cria um novo registro na tabela caixas
        const caixa = await Caixa.create({
            tipo: tipo,
            valor: parseFloat(valor),
            status: parseInt(status),
        });

        // Redireciona para a página principal após o cadastro
        res.send(caixa).status(201);
    } catch (error) {
        // Em caso de erro, encaminha o erro para o próximo middleware de erro
        next(error);
    }
});

module.exports = router;

module.exports = router;
