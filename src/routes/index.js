const { Router } = require('express');
const dishesRouter = require("../routes/dishesRouter");

const router = Router();

router.use("/dishes", dishesRouter);

module.exports = router;