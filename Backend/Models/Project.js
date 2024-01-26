import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const Project = sq.define('project', {
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creatorsEmail: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commentsId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    githubLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.BLOB(10*1024*1024),
        allowNull: false,
    }
})

User.sync().then(() => {
    console.log('User model synced');
}). catch(err => {
    console.error('Unable to sync model: ', err);
});

export default Project;