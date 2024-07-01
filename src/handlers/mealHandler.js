const getMeal = require("../controllers/getMeal");

const getMealTypesHandler = async (req, res) => {
  try {
      const mealTypes = await getMeal();
      return res.status(200).json({ mealTypes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMealTypesHandler;