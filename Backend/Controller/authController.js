const catchAsyncError = require("../Middleware/catchAsyncError");
const Cart = require("../Model/cartModel");
const Token = require("../Model/tokenModel");
const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const sendEmail = require("../Utils/sendEmail");
const { createSendToken } = require("../Utils/sendToken");
const crypto = require("crypto");
const { emailVerification } = require("../Utils/verifyEmail");

//?  @ route  POST api/v1/users/signup
//?  @ desc    Register a new user account
//?  @ access  public

exports.signup = catchAsyncError(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return next(
      new AppError(
        "This email address is already associated with another account.",
        400
      )
    );
  }
  const user = await User.create(req.body);

  const newCart = new Cart({
    user: user.id,
    books: [],
    totalPrice: 0,
  });
  await newCart.save();
  emailVerification(user, res);
});

//?  @ route  POST api/v1/users/confirmEmail/:token
//?  @ desc   verified email id (gmail.com)
//?  @ access  public

exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const existingToken = await Token.findOne({ token });
  if (!existingToken) {
    return next(
      new AppError(
        "Your verification link may have expired. Please click on resend for verify your Email.",
        400
      )
    );
  }
  const user = await User.findOne({ _id: existingToken.userId });
  if (!user) {
    return next(
      new AppError(
        "We Are unable to find the user for this verification! please sign up ",
        400
      )
    );
  }

  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "Success",
    message: "Your account has been successfully verified , please login",
  });
});

//?  @ route  POST api/v1/users/login
//?  @ desc   login user
//?  @ access  public

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError("please provide email and password for login", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("There is no user with that email id", 400));
  }
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 400));
  }
  if (!user.isVerified) {
    return next(
      new AppError(
        "your account is not verfied, please verified first then login again",
        401
      )
    );
  }
  createSendToken(user, 201, res);
});

//?  @ route  POST api/v1/users/logout
//?  @ desc   logout user
//?  @ access  private

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

//?  @ route  POST api/v1/users/forgotPassword
//?  @ desc   forgot Password
//?  @ access  private

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }

  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  const firstName = user.firstName;

  const message = `Hello ${firstName},\n\n\n\We received a request to reset your password on BookHub. To create a new password and regain access to your account, please follow the link below: \n${resetUrl} \n\n This link will expire in 10 Minutes, so be sure to use it soon. If you didn't request a password reset, you can safely ignore this message, and your password will remain unchanged.\n\n\nThank you for using BookHub!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your BookHub Password (valid for 10 min)",
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

//?  @ route  POST api/v1/users/resetPassword/:token
//?  @ desc   reset password
//?  @ access  private

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  createSendToken(user, 200, res);
});

//?  @ route  POST api/v1/users/getMe
//?  @ desc   get current logged in user
//?  @ access  private

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//?  @ route  POST api/v1/users/updateMyPassword
//?  @ desc   update own password
//?  @ access  private

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createSendToken(user, 200, res);
});
