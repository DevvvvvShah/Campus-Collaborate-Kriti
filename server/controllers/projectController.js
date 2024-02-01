const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Project = require('../models/Project');
const User = require('../models/User');
const Comment = require('../models/Comments');

cloudinary.config({ 
    cloud_name: 'dpobpe2ga', 
    api_key: '528297887196318', 
    api_secret: 'jcpYq5B7_OEhB5nFK2gvgQmmqn8' 
  });

const newProject = async (req, res) => {
    const project = req.body;
    try {
        const newProject = await new Project(project).save();
        if (req.files) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, {
                    resource_type: 'auto' // Automatically detect the resource type (image or video)
                });
            });
            const results = await Promise.all(uploadPromises);
            newProject.mediaArray = results.map(result => result.secure_url); // Add secure URLs to newProject.mediaArray
        }
        const user = await User.findById(req.user);
        user.projects.push(newProject._id);
        await user.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const likeProject = async (req, res) => {
    const { projectId } = req.body;
    try {
        const project = await Project.findById(projectId);
        console.log(project);
        await User.findById(req.user).then(user => {
            if (project.likes.includes(user._id)) {
                project.likes.pull(user._id);
            } else if (project.dislikes.includes(user._id)) {
                project.dislikes.pull(user._id);
                project.likes.push(user._id);
            } else {
                project.likes.push(user._id);
            }
        });
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const dislikeProject = async (req, res) => {
    const { projectId } = req.body;
    try {
        const project = await Project.findById(projectId);
        await User.findById(req.user).then(user => {
            if (project.dislikes.includes(user._id)) {
                project.dislikes.pull(user._id);
            } else if (project.likes.includes(user._id)) {
                project.likes.pull(user._id);
                project.dislikes.push(user._id);
            } else {
                project.dislikes.push(user._id);
            }
        });
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyProjects = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const projects = user.projects;
        console.log(projects);
        const projectarray = await Project.find({ _id: { $in: user.projects } });
        res.status(200).json({ projectarray, projects });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const addComment = async (req, res) => {
    const { projectId, content } = req.body;
    try {
        const newComment = await new Comment({ content, userId: req.user }).save();
        const commentId = newComment._id;
        const project = await Project.findById(projectId);
        console.log(project);
        project.commentsId.push(commentId);
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyConnectionProjects = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const connections = user.connections;
        console.log(connections);
        const projects = await Project.find({ creatorId:{ $in: connections } });
        console.log(projects);
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}





module.exports = {newProject, getAllProjects, getProject, deleteProject, likeProject, dislikeProject, getMyProjects, addComment,getMyConnectionProjects}