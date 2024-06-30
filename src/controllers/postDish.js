const { Dish, Meal_Type } = require("../db");

const postDish = async (dishData) => {
  const { name, description, price, image, mealTypeId } = dishData;

  const newDish = await Dish.create({
    name,
    description,
    price,
    image,
  });

  const mealType = await Meal_Type.findByPk(mealTypeId);

  if (!mealType) {
    throw new Error("El mealType no existe");
  }

  await newDish.setMeal_Type(mealType);

  if (!newDish) {
    throw new Error(`Error al crear el plato de comida: ${error.message}`);
  }

  return newDish.id;
};

module.exports = postDish;
