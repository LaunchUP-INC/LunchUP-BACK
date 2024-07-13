const {
  createReviewsController,
  getReviewsController,
  getHighScoreReviewsController,
  deleteReviewsController,
} = require("../controllers/reviewsController");

const createReviewsHandler = async (req, res) => {
  const id = req.params.id;
  const { comment, score } = req.body;

  try {
    const review = await createReviewsController(comment, score, id);
    return res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getReviewsHandler = async (req, res) => {
  try {
    const reviews = await getReviewsController();
    return res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHighScoreReviews = async (req, res) => {
  try {
    const reviews = await getHighScoreReviewsController();
    return res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReviewsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteReview = await deleteReviewsController(id);
    res.status(200).json(deleteReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReviewsHandler,
  getReviewsHandler,
  getHighScoreReviews,
  deleteReviewsHandler,
};
