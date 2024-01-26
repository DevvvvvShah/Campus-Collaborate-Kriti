import mongoose from 'mongoose';
import { Comments } from './Comments.js';
import { User } from './User.js';

const discussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    poster : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    postingTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;