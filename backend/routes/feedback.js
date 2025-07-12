const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createFeedback } = require('../controllers/feedbackController');

router.post('/', auth, createFeedback);

module.exports = router; 