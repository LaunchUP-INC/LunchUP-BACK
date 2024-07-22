const { Router } = require("express");
const { paymentNotificationHandler } = require("../handlers/paymentHandler");

const payNotificationRouter = Router();

payNotificationRouter.post("/", paymentNotificationHandler); //

module.exports = payNotificationRouter;
