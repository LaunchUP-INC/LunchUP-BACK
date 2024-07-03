const { Router } = require("express");
const dishesRouter = require("./dishesRouter");
const userRouter = require("./userRouter");
const mealTypesRouter = require("./mealTypesRouter");

const router = Router();

router.use("/dishes", dishesRouter);
router.use("/register", userRouter);
router.use("/login", userRouter);
router.use("/meal", mealTypesRouter);

module.exports = router;
