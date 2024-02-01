const express = require("express");
const router = express.Router();
<<<<<<< HEAD
// const cloudinary = require("cloudinary");
const User = require("../models/User");
=======
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
>>>>>>> e6a212492ce49a40957f9a66f30d71178442f5c0

// cloudinary.config({
//   cloud_name: "dpobpe2ga",
//   api_key: "528297887196318",
//   api_secret: "jcpYq5B7_OEhB5nFK2gvgQmmqn8",
// });

// get profile of user
const getUserProfile = async (req, res) => {
  await User.findById(req.params.userid)
    .then((user) => {
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

// update profile of logged in user
<<<<<<< HEAD
const updateUserProfile = async (req, res) => {
  console.log(req.body);
  await User.findByIdAndUpdate(req.user, req.body)
    .then((user) => {
      //   if (req.file) {
      //     cloudinary.uploader.upload(req.file.path, async (result) => {
      //       user.profilePic = result.secure_url;
      //       await user.save();
      //     });
      //   }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
=======
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
>>>>>>> e6a212492ce49a40957f9a66f30d71178442f5c0
    });
};

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
    } else {
      user.connections.push(userid);
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  getUserProfile,
  updateUserProfile,
  addtoConnection,
};
