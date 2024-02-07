const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');

cloudinary.config({
  cloud_name: "dpobpe2ga",
  api_key: "528297887196318",
  api_secret: "jcpYq5B7_OEhB5nFK2gvgQmmqn8",
});

// get profile of user
const getUserProfile = async (req, res) => {
  await User.findById(req.params.userid).populate("connections")
    .then((user) => {
      user.views += 1;
      user.save();
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get profile of logged in user
const getProfile = async (req, res) => {
  await User.findById(req.user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//search profiles
const searchProfiles = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const users = await User.find({ name: { $regex: searchTerm, $options: "i" } });  
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update profile of logged in user
const updateUserProfile = async (req,res) => {
    console.log("body: ",req.file);
    await User.findByIdAndUpdate(req.user,req.body)
    .then((user) => {
        if(req.file){
            cloudinary.uploader.upload(req.file, async (result) => {
                user.profilePic = result.secure_url;
                await user.save();
            });
        }
        res.status(200).json(user);
    }).catch((err) => {
        res.status(400).json(err);
    });
};

const getAllUserChats = async (req, res) => {
  try {
    const users = await User.find({}).select([
      "email",
      "name",
      "avatarImage",
      "connections",
    ]);
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

    if (user.connections.includes(userid) && user2.connections.includes(req.user)) {
      user.connections.pull(userid);
      user2.connections.pull(req.user);
    } else {
      user.connections.push(userid);
      user2.connections.push(req.user);
    }
    await user.save();
    res.status(200).json({ user, user2 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  getUserProfile,
  updateUserProfile,
  addtoConnection,
  getAllUserChats,
  searchProfiles
};
