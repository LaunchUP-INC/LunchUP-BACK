const { Child, User, School } = require("../db");

const createChild = async (firstname, lastname, gradeLevel, id, schoolId) => {
  const user = await User.findByPk(id);

  const newChild = await Child.create({
    firstname,
    lastname,
    gradeLevel,
    UserId: user.id,
  });

  const school = await School.findByPk(schoolId);

  newChild.setSchool(school);

  return newChild;
};

const putChild = async (id, firstname, lastname, gradeLevel, schoolId) => {
  const child = await Child.findOne({ where: { id } });
  if (!child) {
    throw new Error(`Error al actualizar los datos del perfil: ${id}`);
  }
  child.firstname = firstname || child.firstname;
  child.lastname = lastname || child.lastname;
  child.gradeLevel = gradeLevel || child.gradeLevel;
  // child.SchoolId = schoolId || child.SchoolId; 
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
  const child = await Child.findOne({ 
    where: { id },
    include: {
      model: School,
      attributes: ["id", "name"],
    },
    attributes: { exclude: ["SchoolId"] 
    }, 
  });

  if (!child) {
    throw new Error (`No se encontró el comensal con ID: ${id}`);
  }

  return child;
};

const selectAllChild = async (id) => {
  const childs = await Child.findAll({ 
    where: { UserId: id },
    include: {
      model: School,
      attributes: ["id", "name"],
    },
    attributes: { exclude: ["SchoolId"] 
    },
  });

  if (!childs.length) {
    throw new Error ('No se encontraron comensales');
  }

  return childs;
};

module.exports = {
  createChild,
  putChild,
  deleteChild,
  selectChild,
  selectAllChild
};
