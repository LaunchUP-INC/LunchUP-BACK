const { Router } = require("express");
const { registerHandler, loginHandler } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/", registerHandler);
userRouter.get("/", loginHandler);

module.exports = userRouter;
