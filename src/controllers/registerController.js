const { User } = require("../db");
const bcrypt = require("bcrypt");
const { ValidationError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY_TOKEN } = process.env;

const registerUser = async (
  firstname,
  lastname,
  telephone,
  email,
  password,
  banned
) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ValidationError("El usuario ya existe");
  }

  const salt = 10;
  const hash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstname,
    lastname,
    telephone,
    email,
    password: hash,
    banned,
  });

  return newUser;
};

const checkUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

module.exports = {
  registerUser,
  checkUser,
};
