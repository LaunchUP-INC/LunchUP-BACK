const { Router } = require("express");
const { registerManualHandler } = require("../handlers/registerHandler");
const { validateUser } = require("../utils");

const registerManualRouter = Router();

registerManualRouter.post("/", validateUser, registerManualHandler);

module.exports = registerManualRouter;