const express = require('express');
const fs = require('fs');
const router = express.Router();

// Render contact page
router.get('/', (req, res) => {
    res.render('pages/about');
});

module.exports = router;