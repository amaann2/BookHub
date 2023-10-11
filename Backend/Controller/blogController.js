const catchAsyncError = require("../Middleware/catchAsyncError");
const Blog = require("../Model/blogModel");
const fs = require("fs");
const { getAll, getOne, deleteOne } = require("./handleFactory");

exports.getAllBlog = getAll(Blog);
exports.getBlog = getOne(Blog);
exports.deleteBlog = deleteOne(Blog);

exports.createBlog = catchAsyncError(async (req, res, next) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;
  const postDoc = await Blog.create({
    title,
    summary,
    content,
    cover: newPath,
    user: req.user._id,
  });
  res.json(postDoc);
});

exports.updateBlog = catchAsyncError(async (req, res, next) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { id } = req.params;
  const postDoc = await Blog.findById(id);
  const { title, summary, content } = req.body;

  const updatedPost = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  res.json(updatedPost);
});
