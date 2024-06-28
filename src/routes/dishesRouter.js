const { Router } = require('express');
const {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  putDishesHandler,
  deleteDishesHandler,
} = require('../handlers/dishesHandler');
const { validate } = require('../utils');

const dishesRouter = Router();

dishesRouter.get('/:id', getDetailHandler);
dishesRouter.get('/', getDishesHandler);
dishesRouter.post('/', validate, createDishesHandler);
dishesRouter.put('/:id', putDishesHandler);
dishesRouter.delete('/:id', deleteDishesHandler);

module.exports = dishesRouter;
