const { Dish, Meal_Type } = require("../db");

const getDishById = async (id) => {
  const dish = await Dish.findByPk(id, {
      include: {
          model: Meal_Type,
      },
      attributes: { exclude: ['MealTypeId'] }, 
    });

  if(!dish) {
    throw new Error("No existe plato de comida con ese Id");
  }
  
  return dish;  
};

module.exports = getDishById;