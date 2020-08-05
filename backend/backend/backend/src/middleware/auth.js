const dotenv = require("dotenv");
const authorize = require("../util/auth").authorize;

dotenv.config();

module.exports = {
  authenticate(req, res, next) {
    authorize(req, res, () => {
      return next();
    });
  }
};