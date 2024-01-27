const express = require('express');
const { authenticateUser, verifyToken,authorizeUser } = require('../middlewares/verifyToken');
const router = express.Router();
const { getProfile, getUserProfile, updateUserProfile } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser, getProfile);
router.get('/:userid', verifyToken, authenticateUser, authorizeUser, getUserProfile);
router.put('/', verifyToken, authenticateUser,authorizeUser, updateUserProfile);

module.exports = router;