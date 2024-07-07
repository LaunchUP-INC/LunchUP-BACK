const { Router } = require("express");
const { registerHandler, loginHandler } = require("../handlers/userHandler");
// const { sendWelcomeEmail } = require("../handlers/emailHandler");

const userRouter = Router();

userRouter.post("/", registerHandler);
userRouter.get("/", loginHandler);

module.exports = userRouter;
