const { Dish, Meal_Type } = require("../db");
const { DatabaseError } = require("../errors/customErrors");

const postDish = async dishData => {
  const { name, description, price, images, mealTypes, stock } = dishData;
  const newDish = await Dish.create({
    name,
    description,
    price,
    images: images.length ? images : null,
    stock,
  });

  const result = await Meal_Type.findAll({
    where: {
      id: mealTypes.map(id => parseInt(id)),
    },
  });

  await newDish.setMeal_Types(result);

  if (!newDish) {
    throw new DatabaseError(`Error al crear el plato de comida`);
  }

  return newDish.id;
};

module.exports = postDish;
