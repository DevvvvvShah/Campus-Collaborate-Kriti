import mongoose from 'mongoose';
import { User } from './User.js';
import { Skills } from './Skills.js';
import { Comments } from './Comments.js';


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creatorId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
    }],
    rating: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    dislikes: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    commentsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    
    }],
    techStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
    githubLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;