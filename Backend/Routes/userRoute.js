const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../Middleware/auth");
const {
  logout,
  login,
  signup,
  forgotPassword,
  resetPassword,
  getMe,
  updatePassword,
  verifyEmail,
} = require("../Controller/authController");
const {
  getUser,
  getAllUser,
  updateMe,
  updateUser,
} = require("../Controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.get("/confirmEmail/:token", verifyEmail);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.use(isAuthenticated);

router.get("/getMe", getMe, getUser);
router.patch("/updateMe", updateMe);
router.patch("/updateMyPassword", updatePassword);

router.get("/", isAuthenticated, authorizeRoles("admin"), getAllUser);
router
  .route("/:id")
  .patch(isAuthenticated, authorizeRoles("admin"), updateUser);

module.exports = router;
