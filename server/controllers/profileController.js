const express = require('express');
const { authenticateUser, verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const User = require('../models/User');


const getUserProfile = async (req,res) => {
    await User.findById(req.params.userid)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

const getProfile = async (req,res) => {
    await User.findById(req.user)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
    
}

const updateUserProfile = async (req,res) => {
    await User.findByIdAndUpdate(req.user,req.body)
    then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

module.exports = { getProfile, getUserProfile, updateUserProfile };