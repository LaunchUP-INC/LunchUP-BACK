const postDish = require("../controllers/postDish");
const { getDish } = require("../controllers/getDishes");
const getDishById = require("../controllers/getDishById");
const { deleteDish } = require("../controllers/deleteDish");
const { putDish } = require("../controllers/putDish");
const { getStockDish, updateStock } = require("../controllers/stockController");
const { handleDishesImages } = require("../utils");
const { NotFoundError, DatabaseError } = require("../errors/customErrors");

const createDishesHandler = async (req, res) => {
  const { name, description, price, mealTypes, stock } = req.body;

  let images = [];

  if (req.files) {
    images = req.files.map(file => file.path);
  }

  try {
    const dishData = {
      name,
      description,
      price,
      mealTypes,
      images,
      stock
    };

    const uploadedDishes = await handleDishesImages([dishData]);

    const newId = await postDish(uploadedDishes[0]);

    res.status(201).json({ newId });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(error);
    } else {
      next(new DatabaseError("Error al crear el plato de comida"));
    }
  }
};

const putDishesHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, Meal_Types } = req.body;
  let images = [];

  if (req.files) {
    images = req.files.map(file => file.path);
  }

  try {
    const dishData = {
      name,
      description,
      price,
      Meal_Types,
      images,
    };

    const uploadedDishes = await handleDishesImages([dishData]);

    const response = await putDish(id, uploadedDishes[0]);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

const getDishesHandler = async (req, res, next) => {
  const { search, filterMealTypeBy, orderBy } = req.query;

  try {
    const allDishes = await getDish(search, filterMealTypeBy, orderBy);

    if (!allDishes.length) {
      next(new NotFoundError("No se encontraron platos de comida"));
    }

    res.status(200).json({ allDishes });
  } catch (error) {
    next(error);
  }
};

const getDetailHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dishDetail = await getDishById(id);
    res.status(200).json({ dishDetail });
  } catch (error) {
    next(error);
  }
};

const deleteDishesHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dishDelete = await deleteDish(id);
    res.status(200).json("Se eliminó el plato con el ID: " + id);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishesHandler,
  putDishesHandler,
};
