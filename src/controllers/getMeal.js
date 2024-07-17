const { Meal_Type } = require("../db");
const { DatabaseError } = require("../errors/customErrors");

const getMeal = async () => {
  const mealTypes = await Meal_Type.findAll();

  if (!mealTypes) {
    throw new DatabaseError(`Error en la base de datos`);
  }

  return mealTypes;
};

module.exports = getMeal;
