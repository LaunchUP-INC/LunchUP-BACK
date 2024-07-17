const { Rating, Dish } = require("../db");

const ratingDishController = async (score, idDish) => {
  console.log("plato", idDish);

  const dish = await Dish.findByPk(idDish);

  if (!Number.isInteger(score) || score < 1 || score > 5) {
    throw new Error("La puntuación debe ser un número entero entre 1 y 5.");
  }

  const newRating = await Rating.create({
    score,
    DishId: dish.id,
  });

  return newRating;
};

const getRatingsController = async idDish => {
  console.log(idDish);
  const ratings = await Rating.findAll({
    where: {
      DishId: idDish,
    },
    attributes: ["score"],
  });

  if (ratings.lenght === 0) {
    return 0;
  }

  const sum = ratings.reduce((acc, score) => acc + score.score, 0);
  const averageRat = sum / ratings.length;
  console.log("suma", sum);
  console.log(averageRat);
  return Math.round(averageRat);
};

module.exports = {
  ratingDishController,
  getRatingsController,
};
