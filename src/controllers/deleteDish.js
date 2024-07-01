const { Dish } = require("../db");

const deleteDish = async id => {
  const dish = await Dish.destroy({
    where: {
      id,
    },
  });
  if (!dish) {
    throw new Error("No existe plato de comida con ese Id");
  }
  return dish;
};

module.exports = {
  deleteDish,
};
