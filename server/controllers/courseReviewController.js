const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Course = require('../models/Courses');
const User = require('../models/User');
const Comment = require('../models/Comments');

cloudinary.config({ 
    cloud_name: 'dpobpe2ga', 
    api_key: '528297887196318', 
    api_secret: 'jcpYq5B7_OEhB5nFK2gvgQmmqn8' 
  });

//get all course reviews: GET
const getCourseReviews = async (req, res) => {
    try{
        const courseReviews = await Course.find();
        res.status(200).json(courseReviews);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

//get a course review: GET
const getCourseReview = async (req, res) => {
    const { courseReviewId } = req.body;
    try{
        const courseReview = await Course.findById(courseReviewId).populate('comments');
        res.status(200).json(courseReview);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

//add a course review:  POST
const postCourseReview = async (req, res) => {
    const review = req.body;
    try{
        const newReview = await new Course(review).save();
        if(req.file){
            cloudinary.uploader.upload(req.file.path, async (result) => {
                newReview.coursePic = result.secure_url;
                await newReview.save();
            });
        }
        const user = await User.findById(req.user);
        user.courses.push(newReview._id);
        await user.save();
        res.status(201).json(newReview);
    } catch(err){
        res.status(409).json({message: err.message});
    }
}


//delete course review: DELETE
const deleteCourseReview = async (req, res) => {
    const { courseReviewId } = req.params;
    try {
        const courseReview = await Course.findById(courseReviewId);
        await User.findById(req.user).then((user) => {
            if (courseReview.creator.toHexString() !== user._id.toHexString()) {
                res.status(401).json({ message: "Unauthorized" });
            }
            user.courses.pull(courseReviewId);
            user.save();
        });
        await Course.findByIdAndDelete(courseReviewId);
        res.status(200).json(courseReview);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//get my course reviews:GET
//TODO populate courses
const getMyReviews = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const courses = user.courses;
        console.log(courses);
        const coursearray = await Course.find({ _id: { $in: user.courses } });
        res.status(200).json({ coursearray, courses });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

//comment:PUT
const addComment = async (req, res) => {
    const { courseId, content } = req.body;
    try{
        const newComment = await new Comment({content, userId: req.user}).save();
        const commentId = newComment._id;
        const review = await Course.findById(commentId);
        review.commentsId.push(commentId);
        await review.save();
        res.status(200).json(review);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

module.exports = {getCourseReview, getCourseReviews, getMyReviews, postCourseReview, addComment, deleteCourseReview};