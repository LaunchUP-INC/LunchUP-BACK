const { Router } = require("express");
const dishesRouter = require("../routes/dishesRouter");
const userRouter = require("./userRoutes");

const router = Router();

router.use("/dishes", dishesRouter);
router.use("/register", userRouter);

module.exports = router;
