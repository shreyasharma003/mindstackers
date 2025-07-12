const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { banUser, unbanUser, getAllUsers, getAllSwaps, downloadLogs } = require('../controllers/adminController');

router.get('/users', auth, admin, getAllUsers);
router.patch('/users/:id/ban', auth, admin, banUser);
router.patch('/users/:id/unban', auth, admin, unbanUser);
router.get('/swaps', auth, admin, getAllSwaps);
router.get('/logs', auth, admin, downloadLogs);

module.exports = router; 