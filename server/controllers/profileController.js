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
    console.log(req.body);
    await User.findByIdAndUpdate(req.user,req.body)
    .then((user) => {
        console.log(user);
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

// add profile of a user to connections of logged in user
const addtoConnection = async (req, res) => {
    const { userid } = req.params;
    try {
        const user2 = await User.findById(userid);
        const user = await User.findById(req.user);

        if (!user2) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.connections.includes(userid)) {
            user.connections.pull(userid);
        }
        else{
            user.connections.push(userid);
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProfile, getUserProfile, updateUserProfile,addtoConnection };
