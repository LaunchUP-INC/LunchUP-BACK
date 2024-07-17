const {
  createReviewsController,
  getReviewsController,
  getHighScoreReviewsController,
  deleteReviewsController,
} = require("../controllers/reviewsController");

const createReviewsHandler = async (req, res, next) => {
  const id = req.params.id;
  const { comment, score } = req.body;

  try {
    const review = await createReviewsController(comment, score, id);
    return res.status(200).json({ review });
  } catch (error) {
    next(error);
  }
};
const getReviewsHandler = async (req, res, next) => {
  try {
    const reviews = await getReviewsController();
    return res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

const getHighScoreReviews = async (req, res, next) => {
  try {
    const reviews = await getHighScoreReviewsController();
    return res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

const deleteReviewsHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteReview = await deleteReviewsController(id);
    res.status(200).json(deleteReview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReviewsHandler,
  getReviewsHandler,
  getHighScoreReviews,
  deleteReviewsHandler,
};
