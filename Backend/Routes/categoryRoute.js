const express = require("express");
const {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../Controller/categoryController");
const { authorizeRoles, isAuthenticated } = require("../Middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(isAuthenticated, authorizeRoles("admin"), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(isAuthenticated, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteCategory);
module.exports = router;
