const express = require("express");
const { getToken,authenticateUser,verifyToken,} = require("../middlewares/verifyToken");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {getProfile,getUserProfile,updateUserProfile,addtoConnection,getAllUserChats,searchProfiles} = require("../controllers/profileController");

router.get("/",getToken,verifyToken,authenticateUser,upload.single("profilePic"),getProfile);
router.post("/search/",getToken,verifyToken,authenticateUser,searchProfiles);
router.get("/allChats",getToken,verifyToken,authenticateUser,getAllUserChats);
router.get("/:userid",getToken, verifyToken, authenticateUser, getUserProfile);
router.put("/",getToken,verifyToken,authenticateUser,upload.single("avatar"),updateUserProfile);
router.put("/:userid/addConnection",getToken,verifyToken,authenticateUser,addtoConnection);


module.exports = router;
