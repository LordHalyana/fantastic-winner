const express = require("express");
const fs = require("fs");
const router = express.Router();

// Render index page
router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
