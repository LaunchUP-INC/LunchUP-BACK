const { Router } = require("express");
const { saveCartHandler, loadCartHandler } = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.put("/", saveCartHandler);
cartRouter.get("/:userId", loadCartHandler);

module.exports = cartRouter;
