const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../Middleware/catchAsyncError");
const Book = require("../Model/bookModel");
const Cart = require("../Model/cartModel");
const Order = require("../Model/orderModel");
const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");

exports.checkout = catchAsyncError(async (req, res, next) => {
  const { currentUser } = req.body;
  const { cart } = req.body;
  const line_items = cart?.books.map((item) => {
    return {
      price_data: {
        currency: "inr",

        product_data: {
          name: item.book.title,
          images: [item.book.image],
          metadata: {
            id: item.book._id,
          },
        },
        unit_amount: item.book.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    phone_number_collection: {
      enabled: true,
    },
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "free_shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    invoice_creation: { enabled: true },
    line_items,
    client_reference_id: cart._id,
    customer_email: currentUser.email,
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });
  res.status(200).json({
    status: "success",
    url: session.url,
  });
});

const createOrderCheckout = async (session) => {
  const user = await User.findOne({ email: session.customer_email });
  const cart = await Cart.findById(session.client_reference_id);

  const data = {
    user: user._id,
    books: cart.books,
    total_price: session.amount_total,
    shipping_address: session.shipping_details.address.line1,
    payment_status: session.payment_status,
  };

  cart.books = [];
  cart.total_price = 0;

  await cart.save();
  await Order.create(data);
};
exports.webHooks = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
    console.log("webhook verified");
  } catch (err) {
    console.log(`Webhook Error : ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    createOrderCheckout(event.data.object);
  }

  res.status(200).json({ recieve: true });
};

//  to run stripe ---------------  stripe listen --forward-to localhost:8080/webhook
