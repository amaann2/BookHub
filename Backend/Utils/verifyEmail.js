const Token = require("../Model/tokenModel");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");

exports.emailVerification = async (user, res) => {
  var token = new Token({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await token.save();

  const resetUrl = `${process.env.FRONTEND_URL}/verifyEmail/${token.token}`;
  const firstName = user.firstName;

  const message = `Hello ${firstName},\n\nWelcome to BookHub!\n\nTo ensure the security of your account and enjoy the full benefits of BookHub, please verify your email address by clicking on the link below:\n\n${resetUrl}\n\nThis link will expire in 10 minutes, so be sure to use it promptly. If you didn't request an email verification, you can safely ignore this message, and your account will remain unchanged.\n\nThank you for choosing BookHub as your reading companion!`;

  await sendEmail({
    email: user.email,
    subject: "Account Verification Link ",
    message,
  });
  res.status(200).json({
    status: "success",
    message: "verification link send to email",
  });
};
