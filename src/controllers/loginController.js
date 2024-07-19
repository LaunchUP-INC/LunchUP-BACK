const bcrypt = require("bcrypt");
const { User } = require("../db");
const { NotFoundError, ValidationError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_TOKEN } = process.env;

const loginController = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new NotFoundError("Usuario no encontrado");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new ValidationError("Contraseña incorrecta");
  if (!user && !passwordMatch)
    throw new ValidationError("Debe ingresar los datos requeridos");

  const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY_TOKEN, {
    expiresIn: "1h",
  });

  return { access: true, token };
};

module.exports = { loginController };
