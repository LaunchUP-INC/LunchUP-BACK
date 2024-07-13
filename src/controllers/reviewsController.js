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

const getReviewsController = async () => {
  const reviews = await Review.findAll();
  if (!reviews) {
    throw new Error(`Error al obtener los comentarios: ${error.message}`);
  }

  return reviews;
};

const getHighScoreReviewsController = async () => {
  const reviews = await getReviewsController();
  const highScoreReviews = reviews.filter((review) => review.score >= 3);
  if (!highScoreReviews || highScoreReviews.length === 0) {
    throw new Error(
      "No se encontraron reseñas con puntuación mayor o igual a 3"
    );
  }
  return highScoreReviews;
};

const deleteReviewsController = async (id) => {
  console.log(id);
  const review = await Review.destroy({
    where: {
      id,
    },
  });
  if (!review) {
    throw new Error("No existe comentario con ese Id");
  }

  if (review) {
    console.log("el emnsaje fue eliminado");
  }
  return review;
};

module.exports = {
  createReviewsController,
  getReviewsController,
  getHighScoreReviewsController,
  deleteReviewsController,
};
