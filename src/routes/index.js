const { Router } = require("express");
const dishesRouter = require("./dishesRouter");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const userRouter = require("./userRouter");
const mealTypesRouter = require("./mealTypesRouter");
const paymentRouter = require("./paymentRouter");
const schoolRouter = require("./schoolRouter");
const reviewsRouter = require("../routes/reviewsRouter");
const ratingRouter = require("../routes/ratingRouter");

const router = Router();

router.use("/dishes", dishesRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/meal", mealTypesRouter);
router.use("/payment", paymentRouter);
router.use("/school", schoolRouter);
router.use("/reviews", reviewsRouter);
router.use("/rating", ratingRouter);

module.exports = router;
