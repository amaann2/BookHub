const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

const Book = require("../Model/bookModel");
const Category = require("../Model/categoryModel");
const databaseConnection = require("../Config/Database");

const category = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);
const book = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, "utf-8"));

//import the data
const importData = async () => {
  try {
    await databaseConnection();
    await Category.create(category);
    await Book.create(book);
    console.log("data added successfully");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete the data
const deleteData = async () => {
  try {
    await databaseConnection();
    await Book.deleteMany();
    await Category.deleteMany();
    console.log("data deleted successfully");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
