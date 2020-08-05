const Sequelize = require("sequelize");

const cfg = require("../config/db");

const Agencia = require("../model/Agencia");
const Pedido = require("../model/Pedido");
const AlteracaoPedido = require("../model/AlteracaoPedido");

const connection = new Sequelize(cfg);

Agencia.init(connection);
Pedido.init(connection);
AlteracaoPedido.init(connection);

AlteracaoPedido.associate(connection.models);

module.exports = connection;