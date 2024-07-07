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
} = require("../handlers/childHandler");
const { validateUser } = require("../utils");
const checkJwt = require('../utils/auth');

const userRouter = Router();

userRouter.post("/register", validateUser, registerHandler);
userRouter.put("/:id", checkJwt, putUserHandler);
userRouter.delete("/:id", checkJwt, deleteUserHandler);
userRouter.get("/login", loginHandler);
userRouter.post("/:id/child", checkJwt, createChildHandler);
userRouter.put("/:id/child/:id", checkJwt, putChildHandler);
userRouter.delete("/:id/child/:id", checkJwt, deleteChildHandler);
userRouter.get("/:id/child/:id", checkJwt, selectChildHandler);

module.exports = userRouter;
