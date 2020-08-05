const express = require('express');
const app = express();

const cookie = require('cookie');

const util = require('./utils');

const URL_LOGIN = 'http://login.intranet.bb.com.br/distAuth/UI/Login?goto=';
const NOME_COOKIE_SSO = 'BBSSOToken';
const NOME_COOKIE_ACR = 'ssoacr';
const SERVIDOR_SSO_PADRAO = 'sso.intranet.bb.com.br';

app.get('/sso-simulator', (req, res) => {
  let simulator = util.simulateAuthInformation();

  return res.status(200).send(simulator);
});

app.get('/', async (req, res) => {
  //Teste ambiente local, pois o token sso é gerado pelo login da intranet
  util.simulateCookies(res, NOME_COOKIE_SSO, NOME_COOKIE_ACR);
  //Teste ambiente local, pois o token sso é gerado pelo login da intranet

  let cookies = cookie.parse(req.headers.cookie || '');

  let tokenId = cookies[NOME_COOKIE_SSO];

  if (!tokenId) {
    return res.status(403).json({
      message: 'Por favor, realize o login',
    });
  }

  let server = cookies[NOME_COOKIE_ACR];

  parsedAttributes = await util.getUserAttributes(server, tokenId);

  return res.json(parsedAttributes);
});

app.listen(3333);