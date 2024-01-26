const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;