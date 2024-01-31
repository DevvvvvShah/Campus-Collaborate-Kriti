const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const { newPost, getAllPost, getPost, deletePost, likePost, dislikePost, getMyPosts, addComment, getMyConnectionPosts ,getMyFavPosts,addMyFavPosts } = require('../controllers/postController');

router.post('/',verifyToken,authenticateUser,upload.array('media',10),newPost);
router.get('/', getAllPost);
router.get('/my',verifyToken, authenticateUser, getMyPosts);
router.get('/myconnectionposts',verifyToken, authenticateUser, getMyConnectionPosts);
router.post('/myfavposts',verifyToken, authenticateUser, addMyFavPosts);
router.get('/myfavposts',verifyToken, authenticateUser, getMyFavPosts);
router.get('/:postId', getPost);
router.delete('/:postId',verifyToken,authenticateUser, deletePost); // TODO authorize middleware
router.put('/likes',verifyToken, authenticateUser, likePost);
router.put('/dislikes',verifyToken, authenticateUser, dislikePost);
router.post('/comment',verifyToken, authenticateUser, addComment);


module.exports = router;