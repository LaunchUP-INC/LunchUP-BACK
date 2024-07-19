const { Router } = require("express");
const {
  paymentNotificationHandler,
} = require("../handlers/paymentNotificationHandler");

const payNotificationRouter = Router();

payNotificationRouter.post("/", paymentNotificationHandler);

module.exports = payNotificationRouter;
