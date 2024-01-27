const express = require('express');
const { authenticateUser, verifyToken,authorizeUser } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verifyToken, authenticateUser,authorizeUser, getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);

module.exports = router;