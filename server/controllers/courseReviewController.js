const express = require('express');
const router = express.Router();
const Course = require('../models/Courses');
const User = require('../models/User');
const Comment = require('../models/Comments');

//get all course reviews
const getCourseReviews = async (req, res) => {
    try{
        const courseReviews = await Course.find();
        res.status(200).json(courseReviews);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

//get a course review
const getCourseReview = async (req, res) => {
    const { courseReviewId } = req.body;
    try{
        const courseReview = await Course.findById(courseReviewId).populate('comments');
        res.status(200).json(courseReview);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

//add course review
const postCourseReview = async (req, res) => {
    const review = req.body;
    try{
        const newReview = await new Course(review).save();
        const user = await User.findById(req.user);
        user.courses.push(newReview._id);
        await user.save();
        res.status(201).json(newReview);
    } catch(err){
        res.status(409).json({message: err.message});
    }
}

//delete course review
const deleteCourseReview = async (req, res) => {
    const {courseId} = req.body;
    try{
        const review = await Course.findByIdAndDelete(courseId);
        res.status(200).json(review);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

//get my course reviews
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
//comment
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