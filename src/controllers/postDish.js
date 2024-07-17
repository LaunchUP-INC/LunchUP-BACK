const { Dish, Meal_Type } = require("../db");
const { ValidationError } = require("../errors/customErrors");

const postDish = async dishData => {
  const { name, description, price, images, mealTypes } = dishData;

  const newDish = await Dish.create({
    name,
    description,
    price,
    images: images.length ? images : null,
  });

  const result = await Meal_Type.findAll({
    where: {
      id: mealTypes.map(id => parseInt(id)),
    },
  });

  await newDish.setMeal_Types(result);

  if (!newDish) {
    throw new ValidationError(`Error al crear el plato de comida`);
  }

  return newDish.id;
};

module.exports = postDish;
