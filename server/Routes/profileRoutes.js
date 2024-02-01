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
} = require("../controllers/profileController");

router.get(
  "/",
  getToken,
  verifyToken,
  authenticateUser,
  upload.single("profilePic"),
  getProfile
);
router.get("/:userid", verifyToken, authenticateUser, getUserProfile);
router.put(
  "/",
  verifyToken,
  authenticateUser,
  upload.single("avatar"),
  updateUserProfile
);
router.put(
  "/:userid/addConnection",
  verifyToken,
  authenticateUser,
  addtoConnection
);

module.exports = router;
