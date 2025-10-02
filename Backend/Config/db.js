const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected successfully");
  } catch (err) {
    console.error({ code: "DB_CONNECTION", error: err.message });
    console.log("DB Connection Failed");
  }
};

module.exports = { dbConnection };
