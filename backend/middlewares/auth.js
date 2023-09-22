const { NODE_ENV, SICRET_KEY_SERVER } = process.env;
const jwt = require('jsonwebtoken');
const { SICRET_KEY_SERVER_DEV } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SICRET_KEY_SERVER : SICRET_KEY_SERVER_DEV,
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
