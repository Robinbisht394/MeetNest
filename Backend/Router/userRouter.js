const express = require("express");

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
router.delete("/saved", savedEvents);

module.exports = router;
