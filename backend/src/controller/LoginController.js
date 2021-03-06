const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cookie = require("cookie");

const util = require("../util/filterUtil");

const URL_LOGIN = "http://login.intranet.bb.com.br/distAuth/UI/Login?goto=";
const NOME_COOKIE_SSO = "BBSSOToken";
// const NOME_COOKIE_SSO = "BBSSOToken";
const NOME_COOKIE_ACR = "ssoacr";
const SERVIDOR_SSO_PADRAO = "sso.intranet.bb.com.br";

module.exports = {
  async login(req, res) {

    //Teste ambiente local, pois o token sso é gerado pelo login da intranet
  //util.simulateCookies(res, NOME_COOKIE_SSO, NOME_COOKIE_ACR);
  //Teste ambiente local, pois o token sso é gerado pelo login da intranet

  let cookies = cookie.parse(req.headers.cookie || '');

  let tokenId = req.headers.bbssotoken;

  if (!tokenId) {
    return res.status(403).json({
      message: 'Por favor, realize o login',
    });
  }

  // let server = cookies[NOME_COOKIE_ACR];
  let server =req.headers.ssoacr;


  if (!server) {
    return res.status(403).json({
      message: 'SSOACR não setado.',
    });
  }

  const parsedAttributes = await util.getUserAttributes(server, tokenId);

  const matricula = parsedAttributes.chaveFuncionario;
  const prefixo = parsedAttributes["cd-pref-depe"];

  const nome = parsedAttributes["cn"];

    try {

      const token = jwt.sign({ matricula, prefixo }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
      });
      res.status(200).send({ token, user:{matricula, prefixo,nome} });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Houve um erro, por favor tente novamente." });
    }
  },
};
