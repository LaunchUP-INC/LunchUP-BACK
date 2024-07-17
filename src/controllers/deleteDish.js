const { Dish } = require("../db");
const { NotFoundError } = require("../errors/customErrors");

const deleteDish = async id => {
  const dish = await Dish.destroy({
    where: {
      id,
    },
  });
  if (!dish) {
    throw new NotFoundError("Plato no encontrado");
  }
  return dish;
};

module.exports = {
  deleteDish,
};
