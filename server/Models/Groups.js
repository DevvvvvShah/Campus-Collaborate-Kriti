import mongoose from 'mongoose';
import { User } from './User.js';

const groupSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thumbnail: {
        type: String,
        required: true
    }
});

const Groups = mongoose.model('Groups', groupSchema);

export default Groups;