const { User, Child, School } = require("../db");
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
  children = [] // Valor por defecto para children
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
  });

  if (children.length > 0) {
    const childPromises = children.map(async (child) => {
      const createdChild = await Child.create({
        firstname: child.firstname,
        lastname: child.lastname,
        gradeLevel: child.gradeLevel,
        SchoolId: child.SchoolId,
        UserId: newUser.id,
      });

      const school = await School.findByPk(child.SchoolId);
      if (school) {
        await createdChild.setSchool(school);
      }
    
      return createdChild;
    });
    
    await Promise.all(childPromises);
  }

  return newUser;
};
// const registerUser = async (
//   firstname,
//   lastname,
//   telephone,
//   email,
//   password,
//   banned
// ) => {
//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     throw new ValidationError("El usuario ya existe");
//   }

//   const salt = 10;
//   const hash = await bcrypt.hash(password, salt);

//   const newUser = await User.create({
//     firstname,
//     lastname,
//     telephone,
//     email,
//     password: hash,
//     banned,
//   });

//   return newUser;
// };

const checkUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY_TOKEN, {
      expiresIn: "1h",
    });
    return { access: true, token };
  } else {
    return { access: false }
  }
};

module.exports = {
  registerUser,
  checkUser,
};
