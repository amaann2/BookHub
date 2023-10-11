const catchAsyncError = require("../Middleware/catchAsyncError");
const Cart = require("../Model/cartModel");
const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const sendEmail = require("../Utils/sendEmail");
const { createSendToken } = require("../Utils/sendToken");
const crypto = require("crypto");

exports.signup = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  const newCart = new Cart({
    user: user.id,
    books: [],
    totalPrice: 0,
  });
  await newCart.save();
  createSendToken(user, 201, res);
});
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError("please provide email and password for login", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 400));
  }
  createSendToken(user, 201, res);
});
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("jwt", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "Success",
    message: "logout successfully",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // TODO: get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  // TODO: Generate the random token
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  //TODO: send it to user email

  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  const message = `Forgot your Password? Submit a patch request with your new password and confirm password to : ${resetUrl}. \n If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token send to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email . Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // TODO: Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // TODO: IF token has not expired , and there is user , set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // TODO: update changePasswordAt property for the user - implemented in the userschma.pre('save')  method
  // TODO: Log the user in , send JWT
  createSendToken(user, 200, res);
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  //TODO: Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  //TODO: Check if POSTed current password is correct
  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  // TODO: If so , update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // TODO: Log user in , send JWT
  createSendToken(user, 200, res);
});
