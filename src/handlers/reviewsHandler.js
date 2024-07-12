const { createReviewsController } = require("../controllers/reviewsController");

const createReviewsHandler = async (req, res) => {
  const id = req.params.id;
  const { comment, score } = req.body;
  console.log("x", id);
  try {
    const review = await createReviewsController(comment, score, id);
    return res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getReviewsHandler = async (req, res) => {};
const deleteReviewsHandler = async (req, res) => {};
module.exports = {
  createReviewsHandler,
  getReviewsHandler,
  deleteReviewsHandler,
};
