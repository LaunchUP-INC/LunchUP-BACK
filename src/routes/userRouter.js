const { Router } = require("express");
const {
  putUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandler");
const registerHandler = require("../handlers/registerHandler");
const loginHandler = require("../handlers/loginHandler");
const {
  createChildHandler,
  putChildHandler,
  deleteChildHandler,
  selectChildHandler,
  allChildHandler,
} = require("../handlers/childHandler");

const { validateUser, validateReviews } = require("../utils");
const checkJwt = require("../utils/auth");
const { createReviewsHandler } = require("../handlers/reviewsHandler");

const userRouter = Router();

userRouter.post("/register", validateUser, registerHandler);
userRouter.get("/login", loginHandler);
userRouter.put("/:id", putUserHandler);
userRouter.delete("/:id", deleteUserHandler);
userRouter.post("/:id/child", createChildHandler);
userRouter.get("/:id/child", allChildHandler);
userRouter.put("/child/:id", putChildHandler);
userRouter.delete("/child/:id", deleteChildHandler);
userRouter.get("/child/:id", selectChildHandler);
userRouter.post("/:id/reviews", createReviewsHandler);

module.exports = userRouter;
