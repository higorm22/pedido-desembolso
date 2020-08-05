const express = require('express');

const PedidoController = require('./controller/PedidoController');
const AgenciaController = require('./controller/AgenciaController');
const AlteracaoPedidoController = require('./controller/AlteracaoPedidoController');
const ListaPedidoPrefixoController = require('./controller/ListaPedidoPrefixoController');
const ListaToken = require('./util/utils');
const LoginController = require('./controller/LoginController');

const authMiddleware = require('./middleware/auth');

const routes = express.Router();

//Authentication
const URL_LOGIN = 'http://login.intranet.bb.com.br/distAuth/UI/Login?goto=';
const NOME_COOKIE_SSO = 'BBSSOToken';
const NOME_COOKIE_ACR = 'ssoacr';
const SERVIDOR_SSO_PADRAO = 'sso.intranet.bb.com.br';
routes.get('/sso-simulator', ListaToken);
routes.get('/', ListaToken);
routes.post('/login', LoginController.login);

//Registering Middleware
routes.use(authMiddleware.authenticate);

//Pedidos de Desembolso
routes.get('/pedidos',PedidoController.index);
routes.get('/pedidos/:id',PedidoController.findById);
routes.post('/pedidos',PedidoController.store);
routes.put('/pedidos/:id',PedidoController.update);
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