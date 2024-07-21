const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { SECRET_KEY_TOKEN } = process.env;
const { UnauthorizedError, ForbiddenError } = require('../errors/customErrors');

const authenticateUser = async (req, _, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new UnauthorizedError('Token no proporcionado'));
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY_TOKEN);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new UnauthorizedError('Usuario no encontrado'));
    }

    req.user = user; // Añadir el usuario a la solicitud
    next();
  } catch (err) {
    next(new UnauthorizedError('Token no válido'));
  }
};

const authorizeAdmin = (req, _, next) => {
  if (!req.user.isAdmin) {
    return next(new ForbiddenError('Acceso denegado'));
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin
};
