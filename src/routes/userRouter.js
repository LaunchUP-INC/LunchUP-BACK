const { Router } = require("express");
const {
  allUserHandler,
  getUserHandler,
  putUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandler");
const {
  createChildHandler,
  putChildHandler,
  deleteChildHandler,
  selectChildHandler,
  allChildHandler,
  favoriteDishesHandler,
} = require("../handlers/childHandler");
const { createReviewsHandler } = require("../handlers/reviewsHandler");
const { paymentHandler } = require("../handlers/paymentHandler");
const { getOrdersHandler } = require("../handlers/ordersHandler");

const userRouter = Router();

userRouter.get("/", allUserHandler);
userRouter.get("/:id/orders", getOrdersHandler);
userRouter.get("/:email", getUserHandler);
userRouter.put("/:id", putUserHandler);
userRouter.delete("/:id", deleteUserHandler);
userRouter.post("/:id/child", createChildHandler);
userRouter.get("/:id/child", allChildHandler);
userRouter.put("/child/:id", putChildHandler);
userRouter.delete("/child/:id", deleteChildHandler);
userRouter.get("/child/:id", selectChildHandler);
userRouter.post("/:id/reviews", createReviewsHandler);
userRouter.put("/child/:id/favorite-dishes", favoriteDishesHandler);
userRouter.post("/:id/payment", paymentHandler);

module.exports = userRouter;
