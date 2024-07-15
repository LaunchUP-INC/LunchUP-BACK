const { Router } = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishesHandler,
  putDishesHandler,
  getStockHandler
} = require('../handlers/dishesHandler');
const { validateDish } = require('../utils');
const checkJwt = require('../utils/auth');

const dishesRouter = Router();

dishesRouter.get('/:id/stock', getStockHandler);
dishesRouter.get('/:id', getDetailHandler);
dishesRouter.get('/', getDishesHandler);
dishesRouter.post('/', upload.array('images', 10), validateDish, createDishesHandler);
dishesRouter.delete('/:id', deleteDishesHandler);
dishesRouter.put('/:id', upload.array('images', 10), putDishesHandler);

module.exports = dishesRouter;
