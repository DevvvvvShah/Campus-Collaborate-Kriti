const express = require('express');
const { verifyToken, authenticateUser } = require('../middlewares/verifyToken');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { newProject, getAllProjects, getProject, deleteProject, likeProject, dislikeProject, getMyProjects, addComment,getMyConnectionProjects } = require('../controllers/projectController');


router.post('/', verifyToken, authenticateUser,upload.array('media',10), newProject);
router.get('/', getAllProjects);
router.get('/my', verifyToken, authenticateUser, getMyProjects);
router.get('/myconnectionprojects', verifyToken, authenticateUser, getMyConnectionProjects);
router.get('/:projectId', getProject);
router.delete('/:projectId', verifyToken, authenticateUser, deleteProject); // authorization done in controllers
router.put('/likes', verifyToken, authenticateUser, likeProject);    
router.put('/dislikes', verifyToken, authenticateUser, dislikeProject);
router.post('/comment', verifyToken, authenticateUser, addComment);

module.exports = router;
