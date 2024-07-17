const getMeal = require("../controllers/getMeal");

const getMealTypesHandler = async (req, res, next) => {
  try {
      const mealTypes = await getMeal();
      return res.status(200).json({ mealTypes });
  } catch (error) {
    next(error)
  }
};

module.exports = getMealTypesHandler;