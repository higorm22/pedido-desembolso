const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  async login(req, res) {

    const matricula = "T1073921";
    const prefixo = "1610";

    try {
      const token = jwt.sign({ matricula,prefixo }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
      });
      res.status(200).send({ token,matricula,prefixo });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Houve um erro, por favor tente novamente." });
    }
  },
};
