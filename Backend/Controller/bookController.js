const Book = require("../Model/bookModel");
const AppError = require("../Utils/AppError");
const ApiFeatures = require("../Utils/apiFeatures");
const catchAsyncError = require("./../Middleware/catchAsyncError");
const { updateOne } = require("./handleFactory");
exports.getAllBook = catchAsyncError(async (req, res, next) => {
  const feature = new ApiFeatures(Book.find().populate("category"), req.query)
    .pagination()
    .search()
    .filter()
    .sort();
  const book = await feature.query;
  const bookCount = await Book.countDocuments();
  res.status(200).json({
    status: "Success",
    Total: bookCount,
    result: book.length,
    book,
  });
});

exports.adminAllBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.find().populate("category");
  res.status(200).json({
    status: "Success",
    result: book.length,
    book,
  });
});

exports.createBook = catchAsyncError(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: "Success",
    newBook,
  });
});

exports.getBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate("category");
  if (!book) {
    return next(new AppError("Book not found ", 404));
  }
  res.status(200).json({
    status: "Success",
    book,
  });
});
exports.getThreeBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.find()
    .limit(4)
    .populate("category")
    .sort("-createdAt");
  res.status(200).json({
    status: "Success",
    book,
  });
});

exports.updateBook = updateOne(Book);

exports.deleteBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError("Book not found ", 404));
  }
  res.status(204).json({
    status: "Success",
    book: null,
  });
});

exports.getBookByCategory = catchAsyncError(async (req, res, next) => {
  const book = await Book.find({ category: req.params.id }).populate(
    "category"
  );
  res.status(200).json({
    status: "Success",
    book,
  });
});

exports.searchBooks = catchAsyncError(async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
    ],
  });
  if (!books) {
    return next(new AppError("No Books Found", 404));
  }
  res.status(200).json({
    status: "Success",
    books,
  });
});
