const express = require('express');
const { authenticateUser, verifyToken,authorizeUser } = require('../middlewares/verifyToken');
const router = express.Router();
const { getProfile, getUserProfile, updateUserProfile } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser,authorizeUser, getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);
router.put('/', verifyToken, authenticateUser,authorizeUser, updateUserProfile);

module.exports = router;