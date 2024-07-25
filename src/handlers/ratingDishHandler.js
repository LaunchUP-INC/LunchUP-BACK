const {
  ratingDishController,
  getRatingsController,
} = require("../controllers/ratingController");

const ratingDishHandler = async (req, res, next) => {
  const idDish = req.params.id;
  const { score } = req.body;

  try {
    const rating = await ratingDishController(score, idDish);
    return res.status(200).json({ rating });
  } catch (error) {
    next(error);
  }
};
const getDishRatingHandler = async (req, res, next) => {
  const idDish = req.params.id;
  try {
    const rating = await getRatingsController(idDish);
    return res.status(200).json({ rating });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ratingDishHandler,
  getDishRatingHandler,
};
