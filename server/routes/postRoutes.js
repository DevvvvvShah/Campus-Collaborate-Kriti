const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const { newPost, getAllPost, getPost, deletePost, likePost, dislikePost, getMyPosts, addComment } = require('../controllers/postController');

router.post('/',verifyToken,newPost);
router.get('/', getAllPost);
router.get('/:postId', getPost);
router.get('/my',verifyToken, authenticateUser, getMyPosts);
router.delete('/:postId',verifyToken,authenticateUser, deletePost); // TODO authorize middleware
router.put('/likes',verifyToken, authenticateUser, likePost);
router.put('/dislikes',verifyToken, authenticateUser, dislikePost);
router.post('/comment',verifyToken, authenticateUser, addComment);


module.exports = router;