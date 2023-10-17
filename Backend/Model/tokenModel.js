const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
    index: { expires: 86400000 },
  },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
