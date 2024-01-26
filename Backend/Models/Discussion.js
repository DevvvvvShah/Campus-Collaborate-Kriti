import { now } from 'sequelize/types/utils';
import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const Discussion = sq.define('discussion', {
    discussionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentsId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    upvotes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    downvotes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postingTime: {
        type: DataTypes.DATE,
        allowNull: false,
        default: now
    }
})

User.sync().then(() => {
    console.log('User model synced');
}). catch(err => {
    console.error('Unable to sync model: ', err);
});

export default Discussion;