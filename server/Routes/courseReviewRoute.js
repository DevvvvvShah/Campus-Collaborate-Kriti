const express = require('express');
const { verifyToken, authenticateUser } = require('../middlewares/verifyToken');
const router = express.Router();
const { getCourseReviews, getMyReviews, getCourseReview, postCourseReview, deleteCourseReview, addComment } = require('../controllers/courseReviewController');

router.post('/', verifyToken, authenticateUser, postCourseReview);
router.get('/', verifyToken, authenticateUser, getCourseReviews);
router.get('/my', verifyToken, authenticateUser, getMyReviews);
router.get('/:courseid', verifyToken, authenticateUser, getCourseReview);
router.delete('/:courseid', verifyToken, authenticateUser, deleteCourseReview);
router.post('/comment',verifyToken, authenticateUser, addComment);

module.exports = router;