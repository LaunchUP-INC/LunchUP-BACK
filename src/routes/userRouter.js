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
  allChildHandler
} = require("../handlers/childHandler");
const { validateUser } = require("../utils");
const checkJwt = require('../utils/auth');

const userRouter = Router();

userRouter.post("/register", validateUser, registerHandler);
userRouter.get("/login", loginHandler);
userRouter.put("/:id", checkJwt, putUserHandler);
userRouter.delete("/:id", checkJwt, deleteUserHandler);
userRouter.post("/:id/child", checkJwt, createChildHandler);
userRouter.get("/:id/child", checkJwt, allChildHandler);
userRouter.put("/child/:id", checkJwt, putChildHandler);
userRouter.delete("/child/:id", checkJwt, deleteChildHandler);
userRouter.get("/child/:id", checkJwt, selectChildHandler);

module.exports = userRouter;
