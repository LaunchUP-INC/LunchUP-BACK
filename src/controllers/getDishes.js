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

const getDish = async (search, filterMealTypeBy, orderBy) => {
  let where = {};
  let order = [];

  if (search) {
    where.name = {
      [Op.iLike]: `%${search.toLowerCase()}%`
    };
  }

  // hacer validacion que orderBy posicion [0] sea el nombre de algun atributo de la tabla
  // hacer validacion que orderBy posicion [1] sea "asc" o "desc"
  if (orderBy) {
    const parts = orderBy.split('-');
    const field = parts[0];
    const criteria = parts.length > 1 ? parts[1].toLowerCase() : 'asc';

    order.push([field, criteria]);
  }

  // hacer validacion que filterMealTypeBy sea un number
  if (filterMealTypeBy) {
    const mealType = await Meal_Type.findOne({
      where: {
        id: filterMealTypeBy
      }
    });

    if (mealType) {
      where.MealTypeId = mealType.id
    }
  }

  const allDishes = await Dish.findAll({ 
    where,
    include: {
      model: Meal_Type,
    },
    attributes: { exclude: ['MealTypeId'] },
    order: order
  });
  
  if (!allDishes) {
    throw new Error(`Error al obtener los platos de comida de la base de datos: ${error.message}`);
  }
  
  return allDishes;
};

module.exports = {
  getAllDishes,
  getDish,
}