const mongoose = require("mongoose");
const deliveryStatusEnum = [
  "Pending",
  "Processing",
  "Out for Delivery",
  "Delivered",
  "Failed",
  "Canceled",
];
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  delivery_status: {
    type: String,
    required: true,
    default: "Processing",
    enum: deliveryStatusEnum,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
