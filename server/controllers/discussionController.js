const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Discussion = require('../models/Discussion')

// get profile of user
const newDiscussion = async (req,res) => {
    const discussion = req.body;
    try{
        const newDiscussion = await new Discussion(discussion).save();
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
    const { discussionId } = req.body;
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
        discussion.upvotes.push(req.userId);
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
        discussion.downvotes.push(req.userId);
        await discussion.save();
        res.status(200).json(discussion);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const getMyDiscussions = async (req,res) => {
    try{
        const discussions = await Discussion.find({poster: req.userId});
        res.status(200).json(discussions);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

const addComment = async (req,res) => {
    const { discussionId, content } = req.body;
    try{
        const newComment = await new Comment({content, userId: req.userId}).save();
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
