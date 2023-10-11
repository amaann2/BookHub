const express = require("express");
const { isAuthenticated } = require("../Middleware/auth");
const {
  createReview,
  getReviewsByBook,
  getAverageRating,
} = require("../Controller/reviewController");

const router = express.Router();

router.post("/:bookId", isAuthenticated, createReview);
router.get("/:bookId", getReviewsByBook);
router.get("/:bookId/rating", getAverageRating);
module.exports = router;
