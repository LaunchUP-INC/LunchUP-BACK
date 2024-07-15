const { Dish } = require("../db");

const getStockDish = async(id) => {
  const dish = await Dish.findByPk(id);
  if (!dish) {
    throw new Error(`Plato con id ${id} no encontrado`);
  }
  return dish.stock;
};

module.exports = getStockDish;