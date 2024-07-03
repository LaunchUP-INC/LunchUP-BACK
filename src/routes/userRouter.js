const { Router } = require("express");
const { 
  createUserHandler, 
  putUserHandler, 
  deleteUserHandler, 
  loginHandler 
} = require("../handlers/userHandler");
const { validateUser } = require("../utils");

const userRouter = Router();

userRouter.post("/", validateUser, createUserHandler);
userRouter.put("/:id", putUserHandler);
userRouter.delete("/:id", deleteUserHandler);
userRouter.get("/", loginHandler);

module.exports = userRouter;

