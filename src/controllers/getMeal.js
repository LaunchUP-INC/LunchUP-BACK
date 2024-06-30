const { Meal_Type } = require("../db");

const getMeal = async () => {
  const mealTypes = await Meal_Type.findAll();

  if(!mealTypes) {
    throw new Error(`Error al obtener los tipos de comida de la base de datos: ${error.message}`);
  }
  
  return mealTypes;  
};

module.exports = getMeal;