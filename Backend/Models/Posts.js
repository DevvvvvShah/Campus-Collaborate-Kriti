
import mongoose from 'mongoose';
import { User } from './User.js';
import { Skills } from './Skills.js';
import { Comments } from './Comments.js';


const postSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    timeOfCreation: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    caption:{
        type: String,
        required: true,
    },
    thumbnail: [{
        type: String,
    }],
    techStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
