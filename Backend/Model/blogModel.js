const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
