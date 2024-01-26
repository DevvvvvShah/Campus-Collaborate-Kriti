import mongoose from 'mongoose';
import { User } from './User.js';
import { Skills } from './Skills.js';
import { Course } from './Course.js';
import { Project } from './Project.js';
import { Post } from './Post.js';


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
    courses: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    techStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
    rating: {
        type: Number,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
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

export default Profile;