import { sq } from '../config/db';
import { DataTypes } from 'sequelize';


const Course = sq.define('course', {
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // hello
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    techStacks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    commentsId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    courseLink: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.sync().then(() => {
    console.log('User model synced');
}).catch(err => {
    console.error('Unable to sync model: ', err);
});

export default Course;
