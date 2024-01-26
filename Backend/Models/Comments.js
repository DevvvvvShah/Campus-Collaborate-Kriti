import { sq } from '../config/db';
import { DataTypes } from 'sequelize';
const User = require('./User');

const Comments = sq.define('comments', {
    commentId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    commentText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
    },
    timeOfPost: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {                       // Foreign Key constraint
            model: User,
            key: 'email',
        }
    },
});

Comments.sync().then(() => {
    console.log('Comments model synced');
}). catch(err => {
    console.error('Unable to sync model Comments: ', err);
});

export default Comments;