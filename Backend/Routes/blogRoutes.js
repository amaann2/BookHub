const express = require("express");
const {
  getAllBlog,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../Controller/blogController");
const { isAuthenticated, authorizeRoles } = require("../Middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getAllBlog)
  .post(
    isAuthenticated,
    authorizeRoles("admin"),
    upload.single("file"),
    createBlog
  );
router
  .route("/:id")
  .get(getBlog)
  .put(
    isAuthenticated,
    authorizeRoles("admin"),
    upload.single("file"),
    updateBlog
  )
  .delete(isAuthenticated, authorizeRoles("admin"), deleteBlog);
module.exports = router;
