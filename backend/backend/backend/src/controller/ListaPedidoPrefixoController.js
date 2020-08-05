require("../database");

const Pedido = require("../model/Pedido");

module.exports = {
  async index(req, res) {
    const prefixo = req.prefixo;
    const { Op } = require("sequelize");

    let whereConditionals = {
      prefixo,
    };

    try {
      const pedidos = await Pedido.findAll({
        where: whereConditionals,
      });
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message, error: error });
    }
  },
};
