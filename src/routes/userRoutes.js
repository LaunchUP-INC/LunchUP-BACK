const { Router } = require("express");
const { registerHandler } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/register", registerHandler);
//userRouter.post("/login", loginHandler);

module.exports = userRouter;
