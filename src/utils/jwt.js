require("dotenv").config();
const { SECRET_KEY_TOKEN } = process.env;
const jwt = require("jsonwebtoken");

const tokenLogin = email => {
  try {
    const token = jwt.sign({ email }, SECRET_KEY_TOKEN, {
      expiresIn: "1h",
    });

    console.log("Token generado.");

    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);

    throw error;
  }
};

const verifyToken = (email, password) => {
  try {
    const token = jwt.sign({ email, password }, SECRET_KEY_TOKEN, {
      expiresIn: "24h",
    });

    console.log("Token verificado.");
  } catch (error) {
    console.error("Error al verificar el token:", error);

    throw error;
  }
};

module.exports = { tokenLogin, verifyToken };
