const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const { newPost, getAllPost, getPost, deletePost, likePost, dislikePost, getMyPosts, addComment, getMyConnectionPosts ,getMyFavPosts } = require('../controllers/postController');

router.post('/',verifyToken,authenticateUser,newPost);
router.get('/', getAllPost);
router.get('/:postId', getPost);
router.get('/my',verifyToken, authenticateUser, getMyPosts);
router.get('/myconnectionposts',verifyToken, authenticateUser, getMyConnectionPosts);
router.get('/myfavposts',verifyToken, authenticateUser, getMyFavPosts);
router.delete('/:postId',verifyToken,authenticateUser, deletePost); // TODO authorize middleware
router.put('/likes',verifyToken, authenticateUser, likePost);
router.put('/dislikes',verifyToken, authenticateUser, dislikePost);
router.post('/comment',verifyToken, authenticateUser, addComment);


module.exports = router;