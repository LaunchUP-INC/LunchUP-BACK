const { Dish, Meal_Type } = require("../db");
const { NotFoundError } = require("../errors/customErrors");

const getDishById = async id => {
  const dish = await Dish.findByPk(id, {
    include: {
      model: Meal_Type,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  if (!dish) {
    throw new NotFoundError("Plato de comida no encontrado");
  }

  return dish;
};

module.exports = getDishById;
