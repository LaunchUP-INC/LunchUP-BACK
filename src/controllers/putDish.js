const { Dish, Meal_Type } = require("../db");

const getDish = async(id) => {
  return Dish.findByPk(id, {
    include: {
      model: Meal_Type,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  });
} 

const putDish = async (id, dishData) => {
  const { name, description, price, images, Meal_Types } = dishData;

  const dish = await getDish(id);

  if (!dish) {
    throw new Error(`Plato de comida con ${id} no encontrado`);
  }

  dish.name = name || dish.name;
  dish.description = description || dish.description;
  dish.price = price || dish.price;
  dish.images = images || dish.images;
  
  if (Meal_Types && Meal_Types.length > 0) {
    const newMealTypes = await Meal_Type.findAll({ where: { id: Meal_Types }})
    await dish.removeMeal_Types(dish.Meal_Types);
    await dish.setMeal_Types(newMealTypes);
  }

  await dish.save();

  const newDish = await getDish(id);

  return newDish;
};

module.exports = {
  putDish,
};
