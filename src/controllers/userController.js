const { User } = require("../db");

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

module.exports = { 
  putUser, 
  deleteUser,
};
