const mongoose = require("mongoose");
const eventModel = require("../Model/eventModel");

const getParticipantsPerEvent = async (req, res) => {
  const { user } = req;

  try {
    if (!user)
      return res.status(400).json({
        success: false,
        code: "Unauthrized",
        message: "User not authorized",
      });
    //
    const eventData = await eventModel.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(user._id) } },
      {
        $project: {
          eventName: 1,
          particpantsCount: { $size: "$participants" },
        },
      },
    ]);

    return res
      .status(200)
      .json({ success: true, eventData, message: "event data fetched" });
  } catch (err) {
    console.log({ Api: "Event data APi", error: err.message });

    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong try again!",
      },
    });
  }
};


const getEngageMentPerEvent = async (req, res) => {
  const { user } = req;

  try {
    if (!user)
      return res.status(400).json({
        success: false,
        code: "Unauthrized",
        message: "User not authorized",
      });

    const eventData = await eventModel.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(user._id) } },
      {
        $project: {
          eventName: 1,
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    return res
      .status(200)
      .json({ success: true, eventData, message: "Event data fetched" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getParticipantsPerEvent, getEngageMentPerEvent };
