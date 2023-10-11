const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database is Connected successfully`);
    });
};
module.exports = databaseConnection;
