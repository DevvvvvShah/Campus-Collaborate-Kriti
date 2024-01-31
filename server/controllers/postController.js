const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Comment = require('../models/Comments');
const Post = require('../models/Posts');


const newPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await new Post(post).save();
        console.log("userid: ",req.user);
        const user = await User.findById(req.user);
        console.log("user: ", user);
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate('comments');
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getMyPosts = async (req, res) => {
    try {
        const posts = await User.findOne({ _id: req.user }).populate('posts').select({ posts: 1, _id: 0 });
        res.status(200).json(posts['posts']);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyConnectionPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const connections = user.connections;
        console.log(connections);
        const posts = await Post.find({ creator: { $in: connections } });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addMyFavPosts = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(user.favPosts.includes(postId)){
            user.favPosts.pull(postId);
        }
        else{
            user.favPosts.push(postId);
        }
        await user.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyFavPosts = async (req, res) => {
    try{
        console.log(req.user);
        const user = await User.findById(req.user);
        console.log(user);
        const favPosts = user.favPosts;
        console.log(favPosts);
        const posts = await Post.find({_id: {$in: favPosts}});
        res.status(200).json(posts); 
    } catch(error){
        res.status(404).json({message: error.message});
    }    
}

const deletePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findByIdAndDelete(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const likePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        await User.findById(req.user).then(user => {
            if (post.likes.includes(user._id)) {
                post.likes.pull(user._id);
            } else if (post.dislikes.includes(user._id)) {
                post.dislikes.pull(user._id);
                post.likes.push(user._id);
            } else {
                post.likes.push(user._id);
            }
        });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const dislikePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        await User.findById(req.user).then(user => {
            if (post.dislikes.includes(user._id)) {
                post.dislikes.pull(user._id);
            } else if (post.likes.includes(user._id)) {
                post.likes.pull(user._id);
                post.dislikes.push(user._id);
            } else {
                post.dislikes.push(user._id);
            }
        });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addComment = async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const newComment = await new Comment(comment).save();
        const post = await Post.findById(postId);
        post.comments.push(newComment._id);
        post.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports = { addComment, newPost, getAllPost, getPost, getMyPosts, deletePost, likePost, dislikePost,getMyConnectionPosts,getMyFavPosts,addMyFavPosts};