const { Meal_Type } = require("../db");

const mealTypes = [
  { name: 'conventional' },
  { name: 'vegan' },
  { name: 'vegetarian' },
  { name: 'gluten-free' }
];

const populateMealTypes = async () => {
  try {
    await Meal_Type.sync({ force: true });
    await Meal_Type.bulkCreate(mealTypes);
  } catch (error) {
    console.error('Error al crear tipos de comida:', error);
  } 
};

module.exports = populateMealTypes;