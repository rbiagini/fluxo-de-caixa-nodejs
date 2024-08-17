var express = require("express");
var router = express.Router();
var Caixa = require("../models/caixa"); // Ajuste o caminho conforme necessário

/* GET caixas page. */
router.get("/", async function (req, res, next) {
    try {
        const extrato = await Caixa.findAll();

        const receitas = extrato
            .filter((extrato) => extrato.status === 1)
            .reduce((sum, extrato) => sum + extrato.valor, 0);

        const despesas = extrato
            .filter((extrato) => extrato.status === 0)
            .reduce((sum, extrato) => sum + extrato.valor, 0);

        const valor_total = receitas - despesas;

        res.render("index", {
            extrato,
            valor_total,
            receitas,
            despesas,
            formatarStatus: (status) => {
                return status === 1 ? "Receita" : "Despesa";
            },
            corStatus: (status) => {
                return status === 1 ? "66B2FF" : "FF6666";
            },
        }); // Renderiza uma view chamada 'caixas' com os dados
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
});

router.get("/excluir/:id", async function (req, res, next) {
    try {
        const id = req.params.id;

        // Tenta encontrar e excluir o registro com o ID fornecido
        await Caixa.destroy({ where: { id: id } });

        // Redireciona para a página principal após a exclusão
        res.redirect("/");
    } catch (error) {
        // Em caso de erro, encaminha o erro para o próximo middleware de erro
        next(error);
    }
});

// Rota para exibir o formulário de cadastro
router.get("/adicionar", function (req, res, next) {
    res.render("adicionar");
});

// Rota para processar o formulário e cadastrar um novo item
router.post("/cadastrar", async function (req, res, next) {
    try {
        const { tipo, valor, status } = req.body;
        console.log(valor);

        // Cria um novo registro na tabela caixas
        await Caixa.create({
            tipo: tipo,
            valor: parseFloat(valor),
            status: parseInt(status),
        });

        // Redireciona para a página principal após o cadastro
        res.redirect("/");
    } catch (error) {
        // Em caso de erro, encaminha o erro para o próximo middleware de erro
        next(error);
    }
});

module.exports = router;

module.exports = router;
