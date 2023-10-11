const catchAsyncError = require("../Middleware/catchAsyncError");
const Book = require("../Model/bookModel");
const Order = require("../Model/orderModel");
const AppError = require("../Utils/AppError");
const { getAll } = require("./handleFactory");
exports.getUserOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id })
    .populate("books.book")
    .sort("-createdAt");

  res.status(200).json({
    status: "Success",
    result: order.length,
    order,
  });
});

exports.getAllOrder = getAll(Order);

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("Order not found with this id", 404));
  }

  if (order.delivery_status === "Delivered") {
    return next(new AppError("You already delivered this books", 400));
  }

  if (req.body.delivery_status === "Out for Delivery") {
    for (const item of order.books) {
      const book = await Book.findById(item.book);
      if (book) {
        const purchasedBook = item.quantity;
        if (book.stock >= purchasedBook) {
          book.stock -= purchasedBook;
          item.book.stock = book.stock;

          await book.save();
        } else {
          return next(
            new AppError(`Not enough stock for this book :${book.title}`)
          );
        }
      }
    }
  }

  // Check if the order is being canceled
  if (req.body.delivery_status === "Canceled") {
    // Restore the stock for each book in the order
    for (const item of order.books) {
      const book = await Book.findById(item.book);
      if (book) {
        book.stock += item.quantity;
        item.book.stock = book.stock;

        await book.save();
      }
    }
  }

  order.delivery_status = req.body.delivery_status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "Success",
    message: "Order update successfully",
  });
});

// * for dashboard page -- admin

exports.totalRevenue = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  const revenue = orders.reduce((acc, order) => {
    return acc + order.total_price;
  }, 0);
  const sliceRevenue = revenue.toString().slice(0, -2);
  res.status(200).json({
    status: "success",
    sliceRevenue,
  });
});

exports.getOrderStatusSummary = catchAsyncError(async (req, res, next) => {
  const pendingOrders = await Order.countDocuments({
    delivery_status: "Pending",
  });
  const processingOrders = await Order.countDocuments({
    delivery_status: "Processing",
  });
  const outForDeliveryOrders = await Order.countDocuments({
    delivery_status: "Out for Delivery",
  });
  const deliveredOrders = await Order.countDocuments({
    delivery_status: "Delivered",
  });
  const failedOrders = await Order.countDocuments({
    delivery_status: "Failed",
  });
  const cancelOrders = await Order.countDocuments({
    delivery_status: "Canceled",
  });

  res.status(200).json({
    status: "Success",
    pendingOrders,
    processingOrders,
    outForDeliveryOrders,
    deliveredOrders,
    failedOrders,
    cancelOrders,
  });
});

exports.getRecentOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find().limit(5).sort("-createdAt");
  res.status(200).json({
    status: "Success",
    order,
  });
});
