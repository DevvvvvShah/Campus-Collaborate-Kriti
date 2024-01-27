const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Comment = require('../models/Comments');
const Discussion = require('../models/Discussion')

// get profile of user
const newDiscussion = async (req,res) => {
    const discussion = req.body;
    try{
        const newDiscussion = await new Discussion(discussion).save();
        const user = await User.findById(req.user);
        console.log("user, ",user);
        user.discussions.push(newDiscussion._id);
        await user.save();
        res.status(201).json(newDiscussion);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

const getAllDiscussion = async (req,res) => {
    try{
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const getDiscussion = async (req,res) => {
    const { discussionId } = req.params;
    try{
        const discussion = await Discussion.findById(discussionId).populate('comments');
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const deleteDiscussion = async (req,res) => {
    const { discussionId } = req.body;
    try{
        const discussion = await Discussion.findByIdAndDelete(discussionId);
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const upvoteDiscussion = async (req,res) => {
    const { discussionId } = req.body;
    try{
        const discussion = await Discussion.findById(discussionId);
        await User.findById(req.user).then(user =>{
            if(discussion.upvotes.includes(user._id)){
                discussion.upvotes.pull(user._id);
            }
            else if(discussion.downvotes.includes(user._id)){
                discussion.downvotes.pull(user._id);
                discussion.upvotes.push(user._id);
            }
            else{
                discussion.upvotes.push(user._id);
            }
        })
        await discussion.save();
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const downvoteDiscussion = async (req,res) => {
    const { discussionId } = req.body;
    try{
        const discussion = await Discussion.findById(discussionId);
        await User.findById(req.user).then(user =>{
            if(discussion.downvotes.includes(user._id)){
                discussion.downvotes.pull(user._id);
            }
            else if(discussion.upvotes.includes(user._id)){
                discussion.upvotes.pull(user._id);
                discussion.downvotes.push(user._id);
            }
            else{
                discussion.downvotes.push(user._id);
            }
        })
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const getMyDiscussions = async (req,res) => {
    try{
        const discussions = await User.findOne({_id: req.user}).populate('discussions').select({discussions: 1, _id: 0});
        res.status(200).json(discussions['discussions']);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const addComment = async (req,res) => {
    const { discussionId, content } = req.body;
    try{
        const newComment = await new Comment({content, userId: req.user}).save();
        const commentId = newComment._id;
        const discussion = await Discussion.findById(discussionId);
        discussion.comments.push(commentId);
        await discussion.save();
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

module.exports = { newDiscussion, getAllDiscussion, getDiscussion, deleteDiscussion, upvoteDiscussion, downvoteDiscussion, getMyDiscussions, addComment };
