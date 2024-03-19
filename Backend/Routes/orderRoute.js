const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../Middleware/auth");
const { checkout } = require("../Controller/stripe");
const {
  getUserOrder,
  getAllOrder,
  updateOrder,
  totalRevenue,
  getOrderStatusSummary,
  getRecentOrder,
  getSingleOrder,
  getTopSellingBooks,
} = require("../Controller/orderController");
const router = express.Router();

router.use(isAuthenticated);

router.post("/checkout", checkout);

router.get("/myOrder", isAuthenticated, getUserOrder);

router.route("/").get(isAuthenticated, authorizeRoles("admin"), getAllOrder);
router
  .route("/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleOrder);

router
  .route("/:id")
  .patch(isAuthenticated, authorizeRoles("admin"), updateOrder);

router.get(
  "/revenue/total",
  isAuthenticated,
  authorizeRoles("admin"),
  totalRevenue
);
router.get(
  "/status/summary",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderStatusSummary
);
router.get(
  "/recentOrder",
  isAuthenticated,
  authorizeRoles("admin"),
  getRecentOrder
);
router.get(
  "/top/three",
  isAuthenticated,
  authorizeRoles("admin"),
  getTopSellingBooks
);
module.exports = router;
