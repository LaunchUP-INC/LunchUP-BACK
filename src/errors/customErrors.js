class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database Error") {
    super(message, 500);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  DatabaseError,
};
