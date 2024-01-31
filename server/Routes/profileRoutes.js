const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
const { getProfile, getUserProfile, updateUserProfile, addtoConnection } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser,upload.single('profilePic'), getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);
router.put('/', verifyToken, authenticateUser, updateUserProfile);
router.put('/:userid/addConnection', verifyToken, authenticateUser, addtoConnection);

module.exports = router;