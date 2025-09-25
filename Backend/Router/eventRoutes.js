const express = require("express");
const {
  createEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  registerForEvent,
  fetchEventById,
  updateEventLike,
  eventSearch,
  getEvents,
  getEventLikes,
  getEventPartcipants,
  getOragnizerEventById,
} = require("../Controller/eventController");

const { organiserAuth, attendeAuth } = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/", organiserAuth, createEvent);
router.put("/updateEvent/:eventId", organiserAuth, updateEvent);
router.delete("/removeEvent/:eventId", organiserAuth, removeEvent);
router.get("/", organiserAuth, fetchEvents);
router.get("/search", eventSearch);
router.get("/listevents", attendeAuth, getEvents);
router.put("/like", attendeAuth, updateEventLike);
router.get("/:eventId", attendeAuth, fetchEventById);
router.get("/organizer/event/:id", getOragnizerEventById);
router.get("/:eventId/likes", getEventLikes);
router.get("/:eventId/participants", getEventPartcipants);
// attendee event Routes
router.put("/register", attendeAuth, registerForEvent);

module.exports = router;
