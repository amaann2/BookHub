const express = require("express");
const {
  addBookToCart,
  getUserCart,
  removeBookFromCart,
  updateBookQuantity,
  clearUserCart,
} = require("../Controller/cartController");
const { isAuthenticated } = require("../Middleware/auth");
const router = express.Router();

router.post("/:bookId/add", isAuthenticated, addBookToCart);
router.put("/:bookId/remove", isAuthenticated, removeBookFromCart);
router.patch("/quantity", isAuthenticated, updateBookQuantity);

router.get("/", isAuthenticated, getUserCart);
router.delete("/delete", isAuthenticated, clearUserCart);
module.exports = router;
