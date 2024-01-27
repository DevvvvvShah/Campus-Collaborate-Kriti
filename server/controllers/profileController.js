const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');


const getUserProfile = async (req,res) => {

}

const getProfile = async (req,res) => {
    await User.findById(req.user)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
    
}