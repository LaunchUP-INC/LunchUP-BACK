const { Router } = require("express");
const { registerHandler, checkUserHandler } = require("../handlers/registerHandler");
const { validateUser } = require("../utils");
// const jwtCheck = require("../utils/auth");

const registerRouter = Router();

registerRouter.post("/", validateUser, registerHandler);
registerRouter.post("/check", checkUserHandler);

module.exports = registerRouter;