const catchAsyncError = require("../Middleware/catchAsyncError");
const Review = require("../Model/reviewModel");
const AppError = require("../Utils/AppError");

exports.createReview = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  const existingReview = await Review.findOne({ user: userId, book: bookId });
  if (existingReview) {
    return next(
      new AppError("User already submitted a review for this book", 400)
    );
  }
  const newreview = new Review({
    user: userId,
    book: bookId,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  await Review.create(newreview);
  res.status(201).json({
    status: "success",
    message: "Review created successfully",
    newreview,
  });
});

exports.getReviewsByBook = catchAsyncError(async (req, res, next) => {
  const bookId = req.params.bookId;
  const review = await Review.find({ book: bookId }).populate("user");

  res.status(200).json({
    status: "Success",
    review,
  });
});
exports.getAverageRating = catchAsyncError(async (req, res, next) => {
  const bookId = req.params.bookId;
  const reviews = await Review.find({ book: bookId });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  res.status(200).json({
    status: "Success",
    averageRating,
  });
});
