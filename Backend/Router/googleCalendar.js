const express = require("express");
const { attendeAuth } = require("../Middleware/authMiddleware");
const { addToGoogleCalendar } = require("../Controller/googleCalendar");

const router = express.Router();

router.post("/addtocalendar", attendeAuth, addToGoogleCalendar);

module.exports = router;
