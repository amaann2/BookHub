const AppError = require("./../Utils/AppError");
//! Handles CastError, which occurs when a value can't be cast to a specific data type

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

//! Handles DuplicateFieldDB, which occurs when a duplicate value is found in a unique field

const handleDuplicateFieldDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate Field value : ${value} Please use another value`;
  return new AppError(message, 400);
};
//!  Handles ValidationErrorDB, which occurs when a validation fails for a specific field

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalild input data : ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//! Handles JWTError, which occurs when an invalid JSON Web Token is provided

const handleJWTError = () => {
  return new AppError("Invalid token please log in again ", 401);
};

//! Handles JWTExpiredError, which occurs when a JSON Web Token has expired

const handleJWTExpiredError = () => {
  return new AppError("your token has expired please log in again ", 401);
};

//! Sends detailed error response in the development environment
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//! Sends error response in the production environment
const sendProductionError = (err, res) => {
  //? operational and trusted error : send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //? programming or other  unknown error : don't leak error details
  } else {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong",
    });
  }
};

//! Error handling middleware function
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
    sendProductionError(err, res);
  }
};
