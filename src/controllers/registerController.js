const { User } = require("../db");
const bcrypt = require("bcrypt");

const registerUser = async (
  firstname,
  lastname,
  telephone,
  email,
  password,
  isAdmin
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
      isAdmin
    });
   
    return newUser;
};

module.exports = registerUser;