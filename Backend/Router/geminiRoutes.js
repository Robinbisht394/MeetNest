const express = require("express");
const router = express.Router();
const { eventSummaryController } = require("../Controller/geminiController");
// gemini based API Routes

router.post("/eventSummary", eventSummaryController);

module.exports = router;
