const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    isOnline: { type: Boolean },
    banner: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
