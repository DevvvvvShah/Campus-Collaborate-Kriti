<<<<<<< HEAD
const express = require("express");
const {
  authenticateUser,
  verifyToken,
  getToken,
} = require("../middlewares/verifyToken");
const router = express.Router();
const {
  getProfile,
  getUserProfile,
  updateUserProfile,
  addtoConnection,
} = require("../controllers/profileController");

router.get("/", getToken, verifyToken, authenticateUser, getProfile);
router.get("/:userid", verifyToken, authenticateUser, getUserProfile);
router.put("/", verifyToken, authenticateUser, updateUserProfile);
router.put(
  "/:userid/addConnection",
  verifyToken,
  authenticateUser,
  addtoConnection
);
=======
const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { getProfile, getUserProfile, updateUserProfile, addtoConnection } = require('../controllers/profileController');

router.get('/', verifyToken, authenticateUser,upload.single('profilePic'), getProfile);
router.get('/:userid', verifyToken, authenticateUser, getUserProfile);
router.put('/', verifyToken, authenticateUser,upload.single('avatar'), updateUserProfile);
router.put('/:userid/addConnection', verifyToken, authenticateUser, addtoConnection);
>>>>>>> e6a212492ce49a40957f9a66f30d71178442f5c0

module.exports = router;
