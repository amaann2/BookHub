const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const { getOne, getAll } = require("./handleFactory");

exports.getUser = getOne(User);
exports.getAllUser = getAll(User);

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // TODO : create error if the user POSts password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password update please use /updateMyPasssword.",
        400
      )
    );
  }
  // TODO : Filtered out unwanted field that are not allowed to updated
  const filterBody = filterObj(req.body, "firstName", "lastName", "email");
  

  // TODO : update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  // TODO : create error if the admin want to update anything other than role of user
  if (
    req.body.password ||
    req.body.firstName ||
    req.body.lastName ||
    req.body.email ||
    req.body.photo
  ) {
    return next(new AppError("You can not update the role", 400));
  }
  const filterBody = filterObj(req.body, "role");

  // TODO : update user document
  const updatedUser = await User.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

