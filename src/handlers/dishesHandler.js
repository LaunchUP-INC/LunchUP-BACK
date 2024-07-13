const postDish = require("../controllers/postDish");
const { getDish } = require("../controllers/getDishes");
const getDishById = require("../controllers/getDishById");
const { deleteDish } = require("../controllers/deleteDish");
const { putDish } = require("../controllers/putDish");
const { handleDishesImages } = require("../utils");

const createDishesHandler = async (req, res) => {
  const { name, description, price, mealTypes } = req.body;
  const images = req.files.map((file) => file.path);

  try {
    const dishData = {
      name,
      description,
      price,
      mealTypes,
      images,
    };

    const uploadedDishes = await handleDishesImages([dishData]);

    const newId = await postDish(uploadedDishes[0]);

    res.status(201).json({ newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDishesHandler = async (req, res) => {
  const { search, filterMealTypeBy, orderBy } = req.query;

  try {
    const allDishes = await getDish(search, filterMealTypeBy, orderBy);

    if (!allDishes.length) {
      return res.status(404).json({ error: "No se encontraron platos" });
    }

    res.status(200).json({ allDishes });
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
const deleteDishesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dishDelete = await deleteDish(id);
    res.status(200).json("Se eliminó el plato con el ID: " + id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putDishesHandler = async (req, res) => {
  const { id } = req.params;
  const dishData = req.body;
  try {
    const response = await putDish(id, dishData);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishesHandler,
  putDishesHandler,
};
