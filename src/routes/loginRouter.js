const { Router } = require("express");
const loginHandler = require("../handlers/loginHandler");
const { verifyToken } = require("../utils/jwt");

const loginRouter = Router();

loginRouter.post("/", verifyToken, loginHandler);

module.exports = loginRouter;
