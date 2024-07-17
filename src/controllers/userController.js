const { User, Child, School } = require("../db");

const getAllUser = async () => {
  const users = await User.findAll();
  if (!users) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
  return users;
};

const getUser = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Child,
        attributes: ["id", "firstname", "lastname", "gradeLevel"],
        include: [
          {
            model: School,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  if (!user) {
    throw new Error(`No se encontró el usuario con ID: ${id}`);
  }
  return user;
};

const putUser = async (id, userData) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = userData;
  const user = await User.findByPk(id);
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

module.exports = {
  getAllUser,
  getUser,
  putUser,
  deleteUser,
};
