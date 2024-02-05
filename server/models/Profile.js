const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    techStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
    rating: {
        type: Number,
        required: true
    },
    courses: [{
        course:{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Course'
            },
        isSelected: {
            type: Boolean,
            default: false
    }}],
    projects: [{
        project:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
            },
        isSelected: {
            type: Boolean,
            default: false
    },}],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    views: {
        type: Number,
        default: 0,
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;