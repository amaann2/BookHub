const catchAsyncError = require("../Middleware/catchAsyncError");
const Cart = require("../Model/cartModel");
const AppError = require("../Utils/AppError");

exports.addBookToCart = catchAsyncError(async (req, res, next) => {
  const bookId = req.params.bookId;
  const userId = req.user.id;
  const quantity = req.body.quantity;

  //TODO : Find the cart of the user
  const cart = await Cart.findOne({ user: userId });

  //TODO :  Check if the book is already in the cart
  const index = cart.books.findIndex((book) => book.book.toString() === bookId);

  if (index !== -1) {
    //TODO: Update the quantity of the book if it's already in the cart
    cart.books[index].quantity += quantity;
  } else {
    //TODO: Add the book to the cart if it's not already in the cart
    cart.books.push({ book: bookId, quantity: quantity });
  }
  //TODO: Save the updated cart
  await cart.save();
  res.status(201).json({
    status: "Success",
    message: "Book Added to cart successfully",
    cart,
  });
});
exports.removeBookFromCart = catchAsyncError(async (req, res, next) => {
  //TODO: Find the cart associated with the user
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("cart not found", 404));
  }
  //TODO: Check if the book is already in the cart
  const index = cart.books.findIndex(
    (book) => book.book.toString() === req.params.bookId
  );
  if (index === -1) {
    return next(new AppError("Book Not found in cart", 404));
  }
  //TODO: Remove the book from the cart

  cart.books.splice(index, 1);
  await cart.save();

  res.status(200).json({
    status: "Success",
    message: "Book remove from  cart",
  });
});

exports.updateBookQuantity = catchAsyncError(async (req, res, next) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new AppError("cart not found", 404));
  }
  const index = cart.books.findIndex((book) => book.book.toString() === bookId);
  if (index === -1) {
    return next(new AppError("Book Not found in cart", 404));
  }

  cart.books[index].quantity = quantity;
  await cart.save();
  res.status(200).json({
    status: "Success",
    message: "Qunatity update successfully",
  });
});
exports.getUserCart = catchAsyncError(async (req, res, next) => {
  const userCart = await Cart.findOne({ user: req.user.id }).populate(
    "books.book"
  );

  res.status(200).json({
    status: "Sucess",
    item: userCart.books.length,
    userCart,
  });
});

exports.clearUserCart = catchAsyncError(async (req, res, next) => {
  const userCart = await Cart.findOne({ user: req.user.id }).populate(
    "books.book"
  );
  if (!userCart) {
    return next(new AppError("cart not found", 404));
  }
  if (userCart.books.length === 0) {
    return next(new AppError("There is not item in cart", 404));
  }
  userCart.books = [];
  userCart.totalPrice = 0;
  await userCart.save();
  res.status(204).json({
    status: "Success",
    message: "Cart cleared",
  });
});

exports.totolUserCartQuantity = catchAsyncError(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("books.book");
  let quantity = 0;
  cart.books.forEach((book) => {
    quantity += book.quantity;
  });
  await cart.save();
  res.status(200).json({
    status: "Success",
    total_quantity: quantity,
  });
});
