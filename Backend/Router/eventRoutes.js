const express = require("express");
const {
  createEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  registerForEvent,
  fetchEventsAll,
  fetchEventById,
  updateEventLike,
  eventSearch,
} = require("../Controller/eventController");

const { organiserAuth, attendeAuth } = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/", organiserAuth, createEvent);
router.put("/updateEvent/:eventId", organiserAuth, updateEvent);
router.delete("/removeEvent/:eventId", organiserAuth, removeEvent);
router.get("/", organiserAuth, fetchEvents);
router.get("/search", eventSearch);
router.get("/listevents", fetchEventsAll);
router.get("/:eventId", fetchEventById);
router.put("/like", attendeAuth, updateEventLike);
router.delete("/like", attendeAuth, updateEventLike);
// attendee event Routes
router.put("/register", attendeAuth, registerForEvent);

module.exports = router;
