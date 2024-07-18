require("dotenv").config();
const { SECRET_KEY_TOKEN } = process.env;
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../errors/customErrors");

const loginToken = email => {
  try {
    const token = jwt.sign({ email }, SECRET_KEY_TOKEN, {
      expiresIn: "1h",
    });

    console.log("Token generado.");

    return token;
  } catch (error) {
    next(error);

    throw error;
  }
};

const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new ValidationError('Error al verificar el token: No se proporcionó un token');
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded; // Agregar el usuario decodificado al objeto de solicitud
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { loginToken, verifyToken };
