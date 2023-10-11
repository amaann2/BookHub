const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a Name"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "A book must have a author"],
  },
  ISBN: {
    type: String,
    unique: true,
    required: [true, "A book must have an ISBN number"],
  },
  publish_date: {
    type: Date,
    default: Date.now,
  },
  pages: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, "A book must have a description"],
  },
  price: {
    type: Number,
    required: [true, "A book must have a price"],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
