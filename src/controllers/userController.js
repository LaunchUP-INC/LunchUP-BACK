const { User } = require("../db");
const bcrypt = require("bcrypt");

const registerController = async (
  firstname,
  lastname,
  telephone,
  email,
  password
) => {
  try {
    const userExisting = await User.findOne({ where: { email } });
    if (userExisting) {
      throw new Error("User already exists");
    }
    if (!firstname || !lastname || !telephone || !email || !password) {
      throw new Error("All fields must be complete");
    }
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstname,
      lastname,
      telephone,
      email,
      password: hash,
    });
    //console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
const loginController = async (email, password) => {
  try {
    const userExisting = await User.findOne({ where: { email: email } });
    if (!userExisting) throw new Error("Usuario no encontrado");

    console.log(userExisting);

    const passwordMatch = await bcrypt.compare(password, userExisting.password);
    if (!passwordMatch) throw new Error("Contraseña incorrecta");

    return { access: true, user: userExisting };

    //if (userExisting.password !== password);
    //throw new Error("Contraseña incorrecta");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerController, loginController };
