const { AppError } = require("../errors/customErrors");

const middlewareError = (error, req, res, next) => {
  console.error("Error middleware:", error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { middlewareError };
