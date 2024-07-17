const { Router } = require("express");
const { registerAuth0Handler } = require("../handlers/registerHandler");
const jwtCheck = require("../utils/auth");

const registerAuth0Router = Router();

registerAuth0Router.post("/", jwtCheck, registerAuth0Handler);

module.exports = registerAuth0Router;