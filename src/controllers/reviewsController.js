const { Review, User } = require("../db");

const createReviewsController = async (comment, score, id) => {
  console.log(id);
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  const newReview = await Review.create({
    comment,
    score,
    UserId: user.id,
  });
  return newReview;
};

module.exports = { createReviewsController };
