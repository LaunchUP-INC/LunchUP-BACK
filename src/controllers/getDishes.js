require('dotenv').config();
const { Dish, Meal_Type } = require("../db");
const { Op } = require('sequelize');

const getDish = async (search, filterMealTypeBy, orderBy) => {
  let where = {};
  let order = [];

  if (search) {
    where.name = {
      [Op.iLike]: `%${search.toLowerCase()}%`
    };
  }

  if (orderBy) {
    const parts = orderBy.split('-');
    const field = parts[0];
    const criteria = parts.length > 1 ? parts[1].toLowerCase() : 'asc';

    order.push([field, criteria]);
  }

  if (filterMealTypeBy) {
    const mealTypeIds = filterMealTypeBy.split(',');
    where['$Meal_Types.id$'] = {
      [Op.in]: mealTypeIds
    };
  }

  const allDishes = await Dish.findAll({ 
    where,
    include: {
      model: Meal_Type,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
    order: order
  });
  
  if (!allDishes) {
    throw new Error(`Error al obtener los platos de comida de la base de datos: ${error.message}`);
  }
  
  return allDishes;
};

module.exports = {
  getDish,
}