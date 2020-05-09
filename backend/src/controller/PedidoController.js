require("../database");

const Pedido = require("../model/Pedido");

const index = async (req, res) => {
  const prefixo = req.prefixo;
  try {
    const pedidos = await Pedido.findAll({
      where: [{ prefixo }],
    });

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, error: error });
  }
};

const validate = (dbPedido, res) => {
  //The proposal already exists
  if (dbPedido) {
    if (dbPedido.status !== "EXCLUIDO") {
      return res.status(400).json({
        message:
          "Pedido já existe com No. da Proposta " +
          dbPedido.nr_proposta +
          " e situação " +
          dbPedido.status,
      });
    }
  }
};

const store = async (req, res) => {
  let pedido = req.body;
  try {
    //Find order by proposal number
    let dbPedido = await Pedido.findOne({
      where: {
        nr_proposta: pedido.nr_proposta,
      },
      order: [["createdAt", "DESC"]],
    });

    validate(dbPedido, res);

    //Create new proposal
    pedido = await Pedido.create(req.body);
    return res.status(200).json({message:'Pedido criado com sucesso!'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, error: error });
  }
};

const update = async (req, res) => {
  let pedido = req.body;

  try {
    //Find the order by your ID
    let dbPedido = await Pedido.findByPk(pedido.id);

    //order exists?
    if (!dbPedido) {
      return res.status(400).json({
        message: "Pedido de recurso não existe em nossa base de dados.",
      });
    }

    await Pedido.update(pedido, { where: { id: dbPedido.id } });
    return res.status(200).json({ pedido });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, error: error });
  }
};

const del = async (req, res) => {
  let { id } = req.body;
  try {
    //Find order by it's id
    let dbPedido = await Pedido.findByPk(id);
    //order exists?
    if (!dbPedido) {
      return res.status(400).json({
        errors: [
          {
            message: "Pedido de recurso não existe em nossa base de dados.",
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
};

module.exports = {
  index(req, res) {
    index(req, res);
  },
  store(req, res) {
    store(req, res);
  },
  update(req, res) {
    update(req, res);
  },
  delete(req, res) {
    del(req, res);
  },
};
