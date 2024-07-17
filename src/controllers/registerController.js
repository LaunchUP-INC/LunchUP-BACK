const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwtDecode = require('jwt-decode');

const registerManualUser = async (
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

  return newUser;
};

const registerAuth0User = async (token) => {
  const decoded = jwtDecode(token);
  const { email, given_name: firstname, family_name: lastname } = decoded;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const newUser = await User.create({ email, firstname, lastname });
  
  return newUser;
};

module.exports = {
  registerManualUser,
  registerAuth0User
}
