const express = require("express");
const { attendeAuth } = require("../Middleware/authMiddleware");

const router = express.Router();
const {
  signup,
  login,
  savedEvents,
  getAllSavedEvents,
} = require("../Controller/userController");
router.post("/signup", signup);
router.post("/login", login);
router.put("/saved", savedEvents);
router.get("/saved", attendeAuth, getAllSavedEvents);

module.exports = router;
