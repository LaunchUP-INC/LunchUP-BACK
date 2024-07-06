const { Router } = require("express");
const dishesRouter = require("./dishesRouter");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const userRouter = require("./userRouter");
const mealTypesRouter = require("./mealTypesRouter");

const router = Router();

router.use("/dishes", dishesRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/meal", mealTypesRouter);

module.exports = router;
