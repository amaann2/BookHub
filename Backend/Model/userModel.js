const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter First Name!"],
    maxLength: [15, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should have more than 4 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter Last Name!"],
    maxLength: [15, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter email id"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    maxLength: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
