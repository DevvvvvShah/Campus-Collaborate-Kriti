const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const { getProfile, getUserProfile, updateUserProfile, addtoConnection } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser, getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);
router.put('/', verifyToken, authenticateUser, updateUserProfile);
router.put('/:userid/addConnection', verifyToken, authenticateUser, addtoConnection);

module.exports = router;