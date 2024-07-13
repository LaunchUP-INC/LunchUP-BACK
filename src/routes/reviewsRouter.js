const { Router } = require("express");
const {
  getReviewsHandler,
  getHighScoreReviews,
  deleteReviewsHandler,
} = require("../handlers/reviewsHandler");

const reviewsRouter = Router();

reviewsRouter.get("/", getReviewsHandler);
reviewsRouter.get("/highScore", getHighScoreReviews);
reviewsRouter.delete("/:id", deleteReviewsHandler);

module.exports = reviewsRouter;
