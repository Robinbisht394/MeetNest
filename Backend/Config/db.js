const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (err) {
    // throw Error("db connection failed");
    console.log("db connection failed");
  }
};

module.exports = { dbConnection };
