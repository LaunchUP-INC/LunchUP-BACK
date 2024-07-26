const { Router } = require("express");
const { saveCartHandler, loadCartHandler } = require("../handlers/cartHandler");

cartRouter = Router();

cartRouter.post("/", saveCartHandler);
cartRouter.get("/:userId", loadCartHandler);

module.exports = cartRouter;