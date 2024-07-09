const { Router } = require("express");
const { paymentHandler } = require("../handlers/paymentHandler");

// importo handler
const paymentRouter = Router();

paymentRouter.post("/", paymentHandler);

module.exports = paymentRouter;
