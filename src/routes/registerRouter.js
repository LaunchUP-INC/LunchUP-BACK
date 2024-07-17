const { Router } = require("express");
const { registerHandler, checkUserHandler } = require("../handlers/registerHandler");
const { validateUser } = require("../utils");

const registerRouter = Router();

registerRouter.post("/", validateUser, registerHandler);
registerRouter.post("/check", checkUserHandler);

module.exports = registerRouter;