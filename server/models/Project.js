const mongoose = require('mongoose');


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
        default : 0,
    },
    likes: {
        type: Number,
        default:0,
        required: true,
    },
    dislikes: {
        type: Number,
        default:0,
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
    },
    timeOfPost: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;