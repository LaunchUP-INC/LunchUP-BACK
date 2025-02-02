const { Dish } = require("../db");
const { NotFoundError } = require("../errors/customErrors");

const deleteDish = async (id) => {
  const dish = await Dish.findByPk(id);
  if (!dish) {
    throw new NotFoundError("Plato no encontrado");
  }
  await dish.destroy();
  return { message: 'Plato eliminado definitivamente'};
};

const deleteDishLogically = async (id) => {
  const dish = await Dish.findByPk(id);
  if (!dish) {
    throw new NotFoundError('Plato no encontrado');
  }
  dish.isDeleted = !dish.isDeleted;
  await dish.save();
  return { message: 'Plato eliminado lógicamente' };
};

module.exports = {
  deleteDish,
  deleteDishLogically,
};
