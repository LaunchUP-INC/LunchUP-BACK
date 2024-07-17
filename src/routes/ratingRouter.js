const { Router } = require("express");
const { getDishRatingHandler } = require("../handlers/ratingDishHandler");

const ratingRouter = Router();

ratingRouter.get("/:id", getDishRatingHandler);

module.exports = ratingRouter;
