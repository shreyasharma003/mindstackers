const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSwap, getMySwaps, updateSwapStatus } = require('../controllers/swapController');

router.post('/', auth, createSwap);
router.get('/', auth, getMySwaps);
router.patch('/:id/status', auth, updateSwapStatus);

module.exports = router; 