
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    timeOfCreation: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
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
