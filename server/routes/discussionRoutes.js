const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const { newDiscussion, getAllDiscussion, getDiscussion, deleteDiscussion, upvoteDiscussion, downvoteDiscussion, getMyDiscussions, addComment } = require('../controllers/discussionController');

router.post('/',verifyToken, authenticateUser, newDiscussion);
router.get('/', getAllDiscussion);
router.get('/my',verifyToken, authenticateUser, getMyDiscussions);
router.get('/:discussionId', getDiscussion);
router.delete('/:discussionId',verifyToken, authenticateUser, deleteDiscussion); // TODO authorize middleware
router.put('/upvote',verifyToken, authenticateUser, upvoteDiscussion);
router.put('/downvote',verifyToken, authenticateUser, downvoteDiscussion);
router.post('/comment',verifyToken, authenticateUser, addComment);




module.exports = router;