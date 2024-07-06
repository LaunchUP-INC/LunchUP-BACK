const { Dish } = require("../db");

const putDish = async (id, dishData) => {
  const { name, description, price, images } = dishData;
  const dish = await Dish.findByPk(id)
  if (!dish) {
    throw new Error(`Error al actualizar el plato de comida: ${id}`);
  }

  dish.name = name || dish.name;
  dish.description = description || dish.description;
  dish.price = price || dish.price;
  dish.images = images || dish.images;

  await dish.save()
  return dish;
};

module.exports = {
  putDish,
};
