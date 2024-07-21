const { NotFoundError, ForbiddenError } = require("../errors/customErrors");
const { User, Child, School } = require("../db");

const getAllUser = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  if (!users) {
    throw new NotFoundError(`Error al obtener los usuarios`);
  }
  return users;
};

const getUser = async id => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
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
    throw new NotFoundError(`Usuario no encontrado`);
  }
  return user;
};

const putUser = async (id, userData) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = userData;
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError(`Usuario no encontrado`);
  }

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.telephone = telephone || user.telephone;
  user.email = email || user.email;
  user.password = password || user.password;
  user.isAdmin = isAdmin ? true : false;

  await user.save();
  return user;
};

const deleteUser = async id => {
  const user = await User.destroy({
    where: {
      id,
    },
  });
  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }
  return user;
};

const getUsersAdmin = async id => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    where: {
      isAdmin: true,
    },
  });

  if (!users) {
    throw new ForbiddenError(`Error al obtener los datos del administrador`);
  }

  return users;
};

module.exports = {
  getAllUser,
  getUser,
  putUser,
  deleteUser,
  getUsersAdmin,
};
