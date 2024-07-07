const { Router } = require("express");
const {
  createUserHandler,
  putUserHandler,
  deleteUserHandler,
  loginHandler,
} = require("../handlers/userHandler");
const {
  createChildHandler,
  putChildHandler,
  deleteChildHandler,
  selectChildHandler,
} = require("../handlers/childHandler");
const { validateUser } = require("../utils");

const userRouter = Router();

userRouter.post("/register", validateUser, createUserHandler);
userRouter.put("/:id", putUserHandler);
userRouter.delete("/:id", deleteUserHandler);
userRouter.get("/login", loginHandler);
userRouter.post("/:id/child", createChildHandler);
userRouter.put("/:id/child/:id", putChildHandler);
userRouter.delete("/:id/child/:id", deleteChildHandler);
userRouter.get("/:id/child/:id", selectChildHandler);

module.exports = userRouter;
