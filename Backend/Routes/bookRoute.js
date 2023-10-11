const express = require("express");
const {
  getAllBook,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getThreeBook,
  getBookByCategory,
  searchBooks,
  adminAllBook,
} = require("../Controller/bookController");
const { authorizeRoles, isAuthenticated } = require("../Middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(getAllBook)
  .post(isAuthenticated, authorizeRoles("admin"), createBook);
router
  .route("/:id")
  .get(getBook)
  .patch(isAuthenticated, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteBook);

router.get("/adminbook/all", adminAllBook);
router.get("/ser/search", searchBooks);
router.get("/featbooks/feat", getThreeBook);
router.get("/bookByCat/:id", getBookByCategory);
module.exports = router;
