const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get profile of user
const getUserProfile = async (req,res) => {
    await User.findById(req.params.userid)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

// get profile of logged in user
const getProfile = async (req,res) => {
    await User.findById(req.user)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
    
}

// update profile of logged in user
const updateUserProfile = async (req,res) => {
    await User.findByIdAndUpdate(req.user,req.body)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

module.exports = { getProfile, getUserProfile, updateUserProfile };
