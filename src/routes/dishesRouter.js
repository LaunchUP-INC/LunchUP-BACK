const { Router } = require('express');
const {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishesHandler,
  putDishesHandler,
} = require('../handlers/dishesHandler');
const { validateDish } = require('../utils');
const checkJwt = require('../utils/auth');

const dishesRouter = Router();

dishesRouter.get('/:id', checkJwt, getDetailHandler);
dishesRouter.get('/', checkJwt, getDishesHandler);
dishesRouter.post('/', checkJwt, validateDish, createDishesHandler);
dishesRouter.delete('/:id', checkJwt, deleteDishesHandler);
dishesRouter.put('/:id', checkJwt, putDishesHandler)

module.exports = dishesRouter;
