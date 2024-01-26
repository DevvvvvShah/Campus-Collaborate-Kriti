import { sq } from '../config/db';
import { DataTypes } from 'sequelize';
import User from './User.js';

const Profile = sq.define('profile', {
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.BLOB(10*1024*1024),
        allowNull: true
    },
    courses: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    techStacks: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    projects: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
})

User.sync().then(() => {
    console.log('User model synced');
}). catch(err => {
    console.error('Unable to sync model: ', err);
});

export default Profile;