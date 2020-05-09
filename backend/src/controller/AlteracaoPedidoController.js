require('../database');

const AlteracaoPedido = require('../model/AlteracaoPedido');

module.exports = {
    async index(req, res) {
        const alteracoespedido = await AlteracaoPedido.findAll();
        return res.status(200).json(alteracoespedido);
    },
    async store(req, res) {
        let alteracaopedido = await AlteracaoPedido.create(req.body);

        let alteracaoDoPedidoComVinculacoes = await AlteracaoPedido.findByPk(alteracaopedido.id,{
            include:[
                {
                    association:'Pedido'
                }
            ]
        });
        return res.status(200).json(alteracaoDoPedidoComVinculacoes);
    }
}