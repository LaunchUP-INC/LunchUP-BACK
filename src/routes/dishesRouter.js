const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createDishesHandler,
  getDishesHandler,
  getDetailHandler,
  deleteDishHandler,
  deleteDishLogicallyHandler,
  putDishesHandler,
} = require("../handlers/dishesHandler");
const { ratingDishHandler } = require("../handlers/ratingDishHandler");
const { validateDish } = require("../utils");
const { getStockHandler, putStockHandler } = require('../handlers/stockHandler');

const dishesRouter = Router();

dishesRouter.post('/:id', ratingDishHandler);
dishesRouter.get('/:id/stock', getStockHandler);
dishesRouter.put('/:id/stock', putStockHandler);
dishesRouter.get('/:id', getDetailHandler);
dishesRouter.get('/', getDishesHandler);
dishesRouter.post('/', upload.array('images', 10), validateDish, createDishesHandler);
dishesRouter.delete('/:id/', deleteDishHandler);
dishesRouter.put('/:id/logical', deleteDishLogicallyHandler);
dishesRouter.put('/:id', upload.array('images', 10), putDishesHandler);

module.exports = dishesRouter;
