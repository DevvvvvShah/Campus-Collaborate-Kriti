const express = require('express');
const { getToken, verifyToken, authenticateUser } = require('../middlewares/verifyToken');
const router = express.Router();
const { likeComment, dislikeComment } = require('../controllers/commentController');

router.put('/like/:commentId',getToken, verifyToken, authenticateUser, likeComment);
router.put('/dislike/:commentId',getToken, verifyToken, authenticateUser, dislikeComment);

module.exports = router;