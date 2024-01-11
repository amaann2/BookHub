const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cors({ credentials: true }));

const { webHooks } = require("./Controller/stripe");
app.post("/webhook", express.raw({ type: "application/json" }), webHooks);

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());

const userRoutes = require("./Routes/userRoute");
const bookRoutes = require("./Routes/bookRoute");
const categoryRoutes = require("./Routes/categoryRoute");
const cartRoutes = require("./Routes/cartRoute");
const reviewRoutes = require("./Routes/reviewRoute");
const orderRoutes = require("./Routes/orderRoute");
const blogRoutes = require("./Routes/blogRoutes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/blogs", blogRoutes);

const globalErrorController = require("./Middleware/globalErrorController");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(globalErrorController);

module.exports = app;
