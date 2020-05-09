require('../database');

const Pedido = require('../model/Pedido');

module.exports = {
    async index(req,res){        
        const { Op } = require("sequelize");
        try{
            const pedidos = await Pedido.findAll({
                where:{
                    prefixo: {
                        [Op.eq]:req.prefixo
                    }
                }
            });
            return res.status(200).json(pedidos);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message, error: error });
        }
    }
}