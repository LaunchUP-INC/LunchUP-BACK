const { Router } = require("express");
const { 
  putUserHandler, 
  deleteUserHandler, 
} = require("../handlers/userHandler");
const checkJwt = require('../utils/auth');

const userRouter = Router();

userRouter.put("/:id", checkJwt, putUserHandler);
userRouter.delete("/:id", checkJwt, deleteUserHandler);

module.exports = userRouter;

