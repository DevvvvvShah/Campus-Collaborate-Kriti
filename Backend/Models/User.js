import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const User = sq.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    rollNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    program: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.sync().then(() => {
    console.log('User model synced');
}). catch(err => {
    console.error('Unable to sync model: ', err);
});

export default User;