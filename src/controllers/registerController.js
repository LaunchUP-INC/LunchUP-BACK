const { User } = require("../db");
const bcrypt = require("bcrypt");
const { tokenLogin } = require("../utils/jwt");

const registerUser = async (
  firstname,
  lastname,
  telephone,
  email,
  password,
  isAdmin,
) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const salt = 10;
  const hash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstname,
    lastname,
    telephone,
    email,
    password: hash,
    isAdmin,
  });

  const generateToken = await tokenLogin(email);

  newUser.token = generateToken;

  return newUser;
};

module.exports = registerUser;
