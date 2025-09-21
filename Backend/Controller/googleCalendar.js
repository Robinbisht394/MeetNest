const userModel = require("../Model/userModel");
const { getCalendarClient, getAuthUrl } = require("../utils/googleClient");

const addToGoogleCalendar = async (req, res) => {
  console.log("calendar route");

  const { user } = req;
  console.log(req.body);

  const { event } = req.body;
  // console.log(event.date,event.eventName);

  try {
    const userData = await userModel.findById(user._id);
    const { googletokens } = userData;

    if (googletokens) {
      const calendar = getCalendarClient(googletokens);
      const endDate = new Date(event.date);
      console.log(endDate);

      endDate.setDate(endDate.getDate() + 1);

      const googleEvent = {
        summary: event.eventName,
        description: event.description,
        start: {
          date: event.date.split("T")[0],
        },
        end: {
          date: endDate.toISOString().split("T")[0],
        },
      };

      const response = calendar.events.insert({
        calendarId: "primary",
        resource: googleEvent,
      });
      res.status(200).json({ action: "event_added", eventUrl: response });
    } else {
      const url = getAuthUrl(user._id);
      return res.status(200).json({ action: "redirect", url: url });
    }
    // return res.status(404).json({ message: "user not google authroised" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addToGoogleCalendar };
