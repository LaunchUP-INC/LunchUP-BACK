const { Child, User, School, Dish } = require("../db");
const { NotFoundError, DatabaseError } = require("../errors/customErrors");

const createChild = async (firstname, lastname, gradeLevel, id, SchoolId) => {
  const user = await User.findByPk(id);

  const newChild = await Child.create({
    firstname,
    lastname,
    gradeLevel,
    UserId: user.id,
  });

  const school = await School.findByPk(SchoolId);

  newChild.setSchool(school);

  return newChild;
};

const putChild = async (id, firstname, lastname, gradeLevel, SchoolId) => {
  const child = await Child.findOne({ where: { id } });
  if (!child) {
    throw new DatabaseError(`Error al actualizar los datos del perfil`);
  }
  child.firstname = firstname || child.firstname;
  child.lastname = lastname || child.lastname;
  child.gradeLevel = gradeLevel || child.gradeLevel;
  child.SchoolId = SchoolId || child.SchoolId;
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
  const child = await Child.findByPk(id, {
    include: [
      {
        model: School,
        attributes: ["id", "name"],
      },
      {
        model: Dish,
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
    attributes: { exclude: ["SchoolId"] },
  });

  if (!child) {
    throw new NotFoundError(`Comensal no encontrado`);
  }

  return child;
};

const selectAllChild = async (id) => {
  const childs = await Child.findAll({
    where: { UserId: id },
    include: [
      {
        model: School,
        attributes: ["id", "name"],
      },
      {
        model: Dish,
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
    attributes: { exclude: ["SchoolId"] },
  });

  if (!childs.length) {
    throw new NotFoundError("No se encontraron comensales");
  }

  return childs;
};

const markFavoriteDishes = async (id, dishIds) => {
  if (!Array.isArray(dishIds) || dishIds.length === 0) {
    throw new NotFoundError("Error al marcar los platos favoritos");
  }

  const child = await Child.findByPk(id, {
    include: [
      {
        model: School,
        attributes: ["id", "name"],
      },
      {
        model: Dish,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["SchoolId"] },
  });

  if (!child) {
    throw new NotFoundError(`Comensal no encontrado`);
  }

  await child.setDishes(dishIds);

  return {
    message: `Platos marcados como favoritos para el niño con ID ${id}`,
  };
};

module.exports = {
  createChild,
  putChild,
  deleteChild,
  selectChild,
  selectAllChild,
  markFavoriteDishes,
};
