const Category = require("../Model/categoryModel");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./handleFactory");

exports.getAllCategory = getAll(Category);
exports.getCategory = getOne(Category);
exports.createCategory = createOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
