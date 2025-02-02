const { Router } = require("express");
const dishesRouter = require("./dishesRouter");
const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const userRouter = require("./userRouter");
const mealTypesRouter = require("./mealTypesRouter");
const payNotificationRouter = require("../routes/payNotificationRouter");
const schoolRouter = require("./schoolRouter");
const reviewsRouter = require("../routes/reviewsRouter");
const ratingRouter = require("../routes/ratingRouter");
const adminRouter = require("./adminRouter");
const cartRouter = require("./cartRouter");

const router = Router();

router.use("/dishes", dishesRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/meal", mealTypesRouter);
router.use("/payNotification", payNotificationRouter); //notificaciones
router.use("/school", schoolRouter);
router.use("/reviews", reviewsRouter);
router.use("/rating", ratingRouter);
router.use("/admin", adminRouter);
router.use("/cart", cartRouter),

module.exports = router;
