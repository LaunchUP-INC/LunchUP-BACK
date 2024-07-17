const { Review, User } = require("../db");
const { NotFoundError } = require("../errors/customErrors");

const createReviewsController = async (comment, score, id) => {
  console.log(id);
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const newReview = await Review.create({
    comment,
    score,
    UserId: user.id,
  });
  return newReview;
};

const getReviewsController = async () => {
  const reviews = await Review.findAll();
  if (!reviews) {
    throw new NotFoundError(`Comentarios no encontrados`);
  }

  return reviews;
};

const getHighScoreReviewsController = async () => {
  const reviews = await getReviewsController();
  const highScoreReviews = reviews.filter(review => review.score >= 3);
  if (!highScoreReviews || highScoreReviews.length === 0) {
    throw new NotFoundError(
      "Reseñas con puntuación mayor o igual a 3 no encontradas",
    );
  }

  highScoreReviews.sort((a, b) => b.score - a.score);

  const topBeterReviews = highScoreReviews.slice(0, 6);

  return topBeterReviews;
};

const deleteReviewsController = async id => {
  console.log(id);
  const review = await Review.destroy({
    where: {
      id,
    },
  });
  if (!review) {
    throw new NotFoundError("Comentario no encontrado");
  }

  if (review) {
    console.log("el mensaje fue eliminado");
  }
  return review;
};

module.exports = {
  createReviewsController,
  getReviewsController,
  getHighScoreReviewsController,
  deleteReviewsController,
};
