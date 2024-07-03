const { Router } = require('express');
const {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishesHandler,
  putDishesHandler,
} = require('../handlers/dishesHandler');
const { validateDish } = require('../utils');

const dishesRouter = Router();

dishesRouter.get('/:id', getDetailHandler);
dishesRouter.get('/', getDishesHandler);
dishesRouter.post('/', validateDish, createDishesHandler);
dishesRouter.delete('/:id', deleteDishesHandler);
dishesRouter.put('/:id', putDishesHandler)

module.exports = dishesRouter;
