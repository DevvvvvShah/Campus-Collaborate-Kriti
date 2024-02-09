const express = require("express");
const {
  getToken,
  authenticateUser,
  verifyToken,
} = require("../middlewares/verifyToken");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getProfile,
  getUserProfile,
  updateUserProfile,
  addtoConnection,
  getAllUserChats,
  removeFromConnection,
  addtoPortfolio,
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
router.put(
  "/addtoPortfolio",
  getToken,
  verifyToken,
  authenticateUser,
  addtoPortfolio
);
router.get("/:userid", getToken, verifyToken, authenticateUser, getUserProfile);
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
router.put(
  "/:userid/removeConnection",
  getToken,
  verifyToken,
  authenticateUser,
  removeFromConnection
);

module.exports = router;
