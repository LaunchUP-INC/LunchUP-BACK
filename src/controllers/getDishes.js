require('dotenv').config();
const { Dish, Meal_Type } = require("../db");
const { Op } = require('sequelize');

const getAllDishes = async () => {
  const allDishes = await Dish.findAll({
    include: {
      model: Meal_Type,
    },
    attributes: { exclude: ['MealTypeId'] }, 
  })

  if (!allDishes) {
    throw new Error(`Error al obtener los platos de comida de la base de datos: ${error.message}`);
  }

  return allDishes;
};

const getDishByName = async (name) => {
  const allDishes = await Dish.findAll({ 
    where: {
      name: {
        [Op.iLike]: `%${name.toLowerCase()}%`
      }
    },
    include: {
      model: Meal_Type,
    },
    attributes: { exclude: ['MealTypeId'] }, 
  })
  
  if (!allDishes) {
    throw new Error(`Error al obtener los platos de comida de la base de datos: ${error.message}`);
  }

  return allDishes;
};

module.exports = {
  getAllDishes,
  getDishByName,
}