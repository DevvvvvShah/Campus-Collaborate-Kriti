const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verifyToken, authenticateUser, (req, res) => {
    console.log('data is sent');
})

module.exports = router;