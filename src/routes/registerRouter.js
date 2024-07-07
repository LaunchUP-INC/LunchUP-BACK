const { Router } = require("express");
const registerHandler = require("../handlers/registerHandler");
const { validateUser } = require("../utils");

const registerRouter = Router();

registerRouter.post("/", validateUser, registerHandler);

module.exports = registerRouter;