const { Router } = require("express");
const { getUserAdminHandler } = require("../handlers/userHandler");

adminRouter = Router();

adminRouter.use("/", getUserAdminHandler);

module.exports = adminRouter;
