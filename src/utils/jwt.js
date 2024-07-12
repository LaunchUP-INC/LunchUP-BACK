require("dotenv").config();
const { SECRET_KEY_TOKEN } = process.env;
const jwt = require("jsonwebtoken");

const loginToken = email => {
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

const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    !accessToken
      ? res.status(400).json({ error: "No hay token" })
      : jwt.verify(accessToken, SECRET_KEY_TOKEN, (err, user) => {
          if (err) {
            res.status(400).json({ error: "Token invalido" });
          } else {
            req.user = user;
            next();
          }
        });
  } catch (error) {
    console.error("Error al verificar el token:", error);

    throw error;
  }
};

module.exports = { loginToken, verifyToken };
