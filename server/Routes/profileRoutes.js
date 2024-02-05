const express = require("express");
const {
  getToken,
  authenticateUser,
  verifyToken,
} = require("../middlewares/verifyToken");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getProfile,
  getUserProfile,
  updateUserProfile,
  addtoConnection,
  getAllUserChats,
} = require("../controllers/profileController");

router.get(
  "/",
  getToken,
  verifyToken,
  authenticateUser,
  upload.single("profilePic"),
  getProfile
  );
  router.get(
    "/allChats",
    getToken,
    verifyToken,
    authenticateUser,
    getAllUserChats
  );
router.get("/:userid",getToken, verifyToken, authenticateUser, getUserProfile);
router.put(
  "/",
  getToken,
  verifyToken,
  authenticateUser,
  upload.single("avatar"),
  updateUserProfile
);
router.put(
  "/:userid/addConnection",
  getToken,
  verifyToken,
  authenticateUser,
  addtoConnection
);


module.exports = router;
