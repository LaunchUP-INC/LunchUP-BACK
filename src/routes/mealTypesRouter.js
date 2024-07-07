const { Router } = require("express");
const getMealTypesHandler = require("../handlers/mealHandler");

const mealTypesRouter = Router();

mealTypesRouter.get("/", getMealTypesHandler);

module.exports = mealTypesRouter;