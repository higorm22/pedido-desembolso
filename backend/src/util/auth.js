const jwt = require('jsonwebtoken');

module.exports = {
  authorize(req, res, cb) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'No token provided.' });
    }

    //Check JWT token format
    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
      return res.status(401).send({ error: 'Token not valid.' });
    }

    const [scheme, token] = parts;

    //Test if token starts with Bearer
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Token malformatted' });
    }

    //Verify token authenticity
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Token invalid.' });
      }
      req.userId = decoded.userId;
      req.customerId = decoded.customerId;
      cb();
    });
  },
};