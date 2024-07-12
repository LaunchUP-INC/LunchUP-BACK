const { Router } = require("express");
const getSchoolsHandler = require("../handlers/schoolHandler");

const schoolRouter = Router();

schoolRouter.get("/", getSchoolsHandler);

module.exports = schoolRouter;
