const { Child, User } = require("../db");

const createChild = async (firstname, lastname, gradeLevel, id) => {
  const user = await User.findByPk(id);

  const newChild = await Child.create({
    firstname,
    lastname,
    gradeLevel,
    UserId: user.id,
  });

  return newChild;
};

const putChild = async (id, firstname, lastname, gradeLevel) => {
  const child = await Child.findOne({ where: { id } });
  if (!child) {
    throw new Error(`Error al actualizar los datos del perfil: ${id}`);
  }
  child.firstname = firstname || child.firstname;
  child.lastname = lastname || child.lastname;
  child.gradeLevel = gradeLevel || child.gradeLevel;

  await child.save();
  return child;
};

const deleteChild = async (id) => {
  const child = await Child.destroy({
    where: {
      id,
    },
  });

  return child;
};

const selectChild = async (id) => {
  const child = await Child.findOne({ where: { id } });
  return child;
};

module.exports = {
  createChild,
  putChild,
  deleteChild,
  selectChild,
};
