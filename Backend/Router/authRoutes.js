const express = require("express");

const { googleCallBack } = require("../Controller/googleAuthController");

const router = express.Router();

// callback for google
router.get("/callback", googleCallBack);

module.exports = router;
