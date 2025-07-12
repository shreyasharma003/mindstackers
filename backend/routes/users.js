const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/:id', auth, getProfile);
router.get('/', auth, getProfile);
router.put('/', auth, upload.single('profilePhoto'), updateProfile);

module.exports = router; 