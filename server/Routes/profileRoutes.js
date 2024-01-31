const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { getProfile, getUserProfile, updateUserProfile, addtoConnection } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser, getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);
router.put('/', verifyToken, authenticateUser,upload.single('avatar'), updateUserProfile);
router.put('/:userid/addConnection', verifyToken, authenticateUser, addtoConnection);

module.exports = router;