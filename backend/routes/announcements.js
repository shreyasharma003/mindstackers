const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');

router.get('/', auth, getAnnouncements);
router.post('/', auth, admin, createAnnouncement);

module.exports = router; 