const express = require('express');

const PedidoController = require('./controller/PedidoController');
const AgenciaController = require('./controller/AgenciaController');
const AlteracaoPedidoController = require('./controller/AlteracaoPedidoController');
const ListaPedidoPrefixoController = require('./controller/ListaPedidoPrefixoController');
const LoginController = require('./controller/LoginController');

const authMiddleware = require('./middleware/auth');

const routes = express.Router();

//Authentication
routes.post('/login', LoginController.login);

//Registering Middleware
routes.use(authMiddleware.authenticate);

//Pedidos de Desembolso
routes.get('/pedidos',PedidoController.index);
routes.post('/pedidos',PedidoController.store);
routes.put('/pedidos',PedidoController.update);
routes.delete('/pedidos',PedidoController.delete);

//Agências
routes.get('/agencias',AgenciaController.index);
routes.post('/agencias',AgenciaController.store);

//Alteração de pedido
routes.get('/alteracoes',AlteracaoPedidoController.index);
routes.post('/alteracoes',AlteracaoPedidoController.store);

//Lista pedidos por prefixos
routes.get('/pedidosPrefixos',ListaPedidoPrefixoController.index);

module.exports = routes;