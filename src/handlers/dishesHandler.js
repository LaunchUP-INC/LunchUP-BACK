const postDish = require("../controllers/postDish");
const { getDish, getAllDishes } = require("../controllers/getDishes");
const getDishById = require("../controllers/getDishById");

const createDishesHandler = async (req, res) => {
  const { name, description, price, image, mealTypeId } = req.body;
  try {
    const newId = await postDish({
      name,
      description,
      price,
      image,
      mealTypeId,
    });
    res.status(200).json({ newId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDishesHandler = async (req, res) => {
  const { search, filterMealTypeBy, orderBy } = req.query;

  try {
      
    if (!search && !filterMealTypeBy && !orderBy) {
      const allDishes = await getAllDishes();
      return res.status(200).json({ allDishes });
    } 

    const dish = await getDish(search, filterMealTypeBy, orderBy);

    if (!dish.length) {
      return res.status(404).json({ error: 'No se encontraron platos' });
    }

    res.status(200).json({ dish });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const dishDetail = await getDishById(id);
    res.status(200).json({ dishDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
};
