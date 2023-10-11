const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;

  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "jwt") {
        token = value;
        break;
      }
    }
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! please log  in to access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belong to this token does no longer exists", 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.authorizeRoles = (...userRoles) => {
  return (req, res, next) => {
    if (!userRoles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
