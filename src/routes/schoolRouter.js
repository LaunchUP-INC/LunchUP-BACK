const { Router } = require("express");
const getSchoolsHandler = require("../handlers/schoolHandler");

const SchoolRouter = Router();

SchoolRouter.get("/", getSchoolsHandler);

module.exports = SchoolRouter;