const postDish = require('../controllers/postDish');
const { getDishByName, getAllDishes } = require('../controllers/getDishes');
const getDishById = require('../controllers/getDishById');

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
  const { name } = req.query;

  try {
    if (name) {
      const dishByName = await getDishByName(name);

      if (!dishByName.length) {
        return res
          .status(404)
          .json({ error: 'No se encontraron platos de comida con ese nombre' });
      }

      res.status(200).json({ dishByName });
    } else {
      const allDishes = await getAllDishes();
      res.status(200).json({ allDishes });
    }
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

const putDishesHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  try {
    const response = await Dish.findByPk(id);
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDishesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await Dish.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(`El menú con ID ${id} ha sido eliminado`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  putDishesHandler,
  deleteDishesHandler,
};
