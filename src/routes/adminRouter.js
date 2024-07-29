const { Router } = require("express");
const { getUserAdminHandler } = require("../handlers/userHandler");

const adminRouter = Router();

adminRouter.get("/", getUserAdminHandler);

module.exports = adminRouter;
