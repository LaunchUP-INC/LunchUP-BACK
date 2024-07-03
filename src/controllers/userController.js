const { User } = require("../db");
const bcrypt = require("bcrypt");

const createUser = async (
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

const putUser = async (id, userData) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = userData;
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error(`Error al actualizar los datos del usuario: ${id}`);
  }

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.telephone = telephone || user.telephone;
  user.email = email || user.email;
  user.password = password || user.password;
  user.isAdmin = isAdmin || user.isAdmin;
  
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error("No existe usuario con ese Id");
  }
  return user;
};

const loginController = async (email, password) => {
  try {
    const userExisting = await User.findOne({ where: { email: email } });
    if (!userExisting) throw new Error("Usuario no encontrado");

    const passwordMatch = await bcrypt.compare(password, userExisting.password);
    if (!passwordMatch) throw new Error("Contraseña incorrecta");

    return { access: true, user: userExisting };

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { 
  createUser, 
  putUser, 
  deleteUser,
  loginController 
};
