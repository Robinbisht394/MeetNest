const express = require("express");
const {
  getParticipantsPerEvent,
  getEngageMentPerEvent,
} = require("../Controller/analyticsController");
const { organiserAuth } = require("../Middleware/authMiddleware");

const router = express.Router();

// router.get("/eventParticipation", getEventPartcipationOvertime);

router.get("/participants-per-event", organiserAuth, getParticipantsPerEvent);
router.get("/likes-per-event", organiserAuth, getEngageMentPerEvent);

module.exports = router;
