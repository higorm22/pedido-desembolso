const dotenv = require('dotenv');
const authorize = require('../util/auth').authorize;

dotenv.config();

module.exports = {
  async auth(req, res) {
    authorize(req, res, () => {
      return res.status(200).json({});
    });
  }
};