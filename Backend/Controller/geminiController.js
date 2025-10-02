const { genarateEventSummary } = require("../utils/geminiService");

// event summary API Controller
const eventSummaryController = async (req, res) => {
  const { description, eventName } = req.body;

  try {
    const eventSummary = await genarateEventSummary(description, eventName);
    //  if gemini doesn't give summary
    if (!eventSummary)
      return res.status(404).json({ message: "No summary found" });

    res.status(200).json({ summary: eventSummary });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { eventSummaryController };
