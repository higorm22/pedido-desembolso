require('../database');

const Pedido = require('../model/Pedido');

module.exports = {
    async index(req,res){
        try{
            const pedidos = await Pedido.findAll();
            return res.status(200).json(pedidos);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message, error: error });
        }
    },
    async store(req,res){
        let pedido = { ...req.body };
        try {
            //Find order by proposal number
            let dbPedido = await Pedido.findOne({
              where: {
                nr_proposta: pedido.nr_proposta,
              },
            });
            //The proposal already exists
            if (dbPedido) {
                return res.status(400).json({
                  message:
                    'Solicitação de pedido para proposta Nr ' + pedido.nr_proposta + ' já existente em nossa base de dados.',
                });
            }
            //Create new proposal
            pedido = await Pedido.create(req.body);
            return res.status(200).json(pedido);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message, error: error });
        }
    },
    async Update (req, res){
        let pedido = { ...req.body };
        
        try {
            //Find the order by your ID
            let dbPedido = await Pedido.findByPk(pedido.id);

            //order exists?
            if (!dbPedido) {
                    return res.status(400).json({
                    message: 'Pedido de recurso não existe em nossa base de dados.',
                });
            }

            await Pedido.update(pedido, { where: { id: dbPedido.id } });
            return res.status(200).json({ pedido });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message, error: error });
          }
    },
    async destoy (req,res){
        let { id } = req.body;
        try {
            //Find order by it's id
            let dbPedido = await Pedido.findByPk(id);
            //order exists?
            if (!dbPedido) {
            return res.status(400).json({
                errors: [
                {
                     message: 'Pedido de recurso não existe em nossa base de dados.',
                },
                ],
            });
            }
            dbPedido.destroy();
            return res.status(200).json({});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ errors: error.errors });
        }
    }
}