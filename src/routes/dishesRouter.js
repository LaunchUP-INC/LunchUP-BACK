const { Router } = require("express");
const { createDishesHandler, getDishesHandler, getDetailHandler } = require("../handlers/dishesHandler");
const { validate } = require('../utils');

const dishesRouter = Router();

dishesRouter.get("/:id", getDetailHandler);
dishesRouter.get("/", getDishesHandler);
dishesRouter.post("/", validate, createDishesHandler);

module.exports = dishesRouter;