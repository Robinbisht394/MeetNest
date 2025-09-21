const jwt = require("jsonwebtoken");
const { getTokens } = require("../utils/googleClient");
const userModel = require("../Model/userModel");

// google callback
const googleCallBack = async (req, res) => {
  console.log("request came from google back");

  try {
    const { code, state } = req.query;
    console.log(code, state, "code and state");

    // decode userId from state
    const decoded = jwt.verify(state, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    const userId = decoded.userId;

    // exchange code for tokens
    const tokens = await getTokens(code);
    console.log(tokens, userId);

    // save tokens to user

    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      googletokens: tokens,
    });
    console.log(updatedUser, "tokens saved");

    res.redirect("http://localhost:5173/dashboard/attendee/events");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "google auth failed" });
  }
};
module.exports = { googleCallBack };
