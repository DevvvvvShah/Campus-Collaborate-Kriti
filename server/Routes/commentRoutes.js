const express = require('express');
const { verifyToken, authenticateUser } = require('../middlewares/verifyToken');
const router = express.Router();
const { likeComment, dislikeComment } = require('../controllers/commentController');

router.put('/like/:commentId',verifyToken, authenticateUser, likeComment);
router.put('/dislike/:commentId',verifyToken, authenticateUser, dislikeComment);

module.exports = router;