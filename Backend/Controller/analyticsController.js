const mongoose = require("mongoose");
const eventModel = require("../Model/eventModel");

// const getEventPartcipationOvertime = async (req, res) => {

// };

const getParticipantsPerEvent = async (req, res) => {
  const { user } = req;

  try {
    const eventData = await eventModel.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(user._id) } },
      {
        $project: {
          eventName: 1,
          particpantsCount: { $size: "$participants" },
        },
      },
    ]);

    return res.status(200).json({ success: true, eventData });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ success: false, message: err.message });
  }
};

const getEngageMentPerEvent = async (req, res) => {
  const { user } = req;

  try {
    const eventData = await eventModel.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(user._id) } },
      {
        $project: {
          eventName: 1,
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    return res.status(200).json({ success: true, eventData });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = { getParticipantsPerEvent, getEngageMentPerEvent };
