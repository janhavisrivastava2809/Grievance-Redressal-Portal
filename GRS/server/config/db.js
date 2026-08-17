const mongoose = require("mongoose");

const mongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error(err);
      console.log("Database not connected");
    });
};

module.exports = mongoDB;
