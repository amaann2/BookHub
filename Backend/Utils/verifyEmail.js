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

  await sendEmail({
    email: user.email,
    subject: "Account Verification Link ",
    html: `<h2>Welcome to BookHub</h2><h3>Hello ${firstName}</h3><p>To ensure the security of your account and enjoy the full benefits of BookHub, please verify your email address by clicking on the link below</p><p>This link will expire in 10 minutes, so be sure to use it promptly.</p><h4> click here to verify the account : <a href=${resetUrl}>Verify Account</a> </h4><p> If you didn't request an email verification, you can safely ignore this message, and your account will remain unchanged</p><br/> <h5>Thank you for choosing BookHub as your reading companion!</h5>`,
  });
  res.status(200).json({
    status: "success",
    message: "verification link send to email",
  });
};
