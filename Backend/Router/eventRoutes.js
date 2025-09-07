const express = require("express");
const {
  createEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  registerForEvent,
  fetchEventsAll,
  fetchEventById,
} = require("../Controller/eventController");

const { organiserAuth, attendeAuth } = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/", organiserAuth, createEvent);
router.put("/updateEvent/:eventId", organiserAuth, updateEvent);
router.delete("/removeEvent/:eventId", organiserAuth, removeEvent);
router.get("/", organiserAuth, fetchEvents);
router.get("/:eventId", fetchEventById);

// attendee event Routes
router.put("/register", attendeAuth, registerForEvent);
router.get("/listevents", fetchEventsAll);

module.exports = router;
