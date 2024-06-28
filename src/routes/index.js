const { Router } = require('express');
const dishesRouter = require("./dishesRouter");

const router = Router();

router.use("/dishes", dishesRouter);

module.exports = router;