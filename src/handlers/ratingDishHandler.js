const {
  ratingDishController,
  getRatingsController,
} = require("../controllers/ratingController");

const ratingDishHandler = async (req, res) => {
  const idDish = req.params.id;

  const { score } = req.body;

  try {
    const rating = await ratingDishController(score, idDish);
    return res.status(200).json({ rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDishRatingHandler = async (req, res) => {
  const idDish = req.params.id;
  try {
    const rating = await getRatingsController(idDish);
    return res.status(200).json({ rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ratingDishHandler,
  getDishRatingHandler,
};
