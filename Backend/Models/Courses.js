import mongoose from 'mongoose';
import { User } from './User.js';
import { Skills } from './Skills.js';
import { Comments } from './Comments.js';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    techStacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
    commentsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ],
    courseLink: {
        type: String,
        required: true,
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
