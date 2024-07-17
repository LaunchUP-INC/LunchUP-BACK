const bcrypt = require("bcrypt");
const { User } = require("../db");
const { NotFoundError, ValidationError } = require("../errors/customErrors");

const loginController = async (email, password) => {
  try {
    const userExisting = await User.findOne({ where: { email: email } });
    if (!userExisting) throw new NotFoundError("Usuario no encontrado");

    const passwordMatch = await bcrypt.compare(password, userExisting.password);
    if (!passwordMatch) throw new ValidationError("Contraseña incorrecta");

    return { access: true, user: userExisting };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { loginController };
