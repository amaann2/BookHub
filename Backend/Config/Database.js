const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database is Connected successfully`);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};
module.exports = databaseConnection;
