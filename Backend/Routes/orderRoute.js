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
} = require("../Controller/orderController");
const router = express.Router();

router.use(isAuthenticated);

router.post("/checkout", checkout);

router.get("/myOrder", isAuthenticated, getUserOrder);

router.route("/").get(isAuthenticated, authorizeRoles("admin"), getAllOrder);
router
  .route("/:id")
  .patch(isAuthenticated, authorizeRoles("admin"), updateOrder);

router.get(
  "/getRevenue",
  isAuthenticated,
  authorizeRoles("admin"),
  totalRevenue
);
router.get(
  "/orderStatusSummary",
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
module.exports = router;
