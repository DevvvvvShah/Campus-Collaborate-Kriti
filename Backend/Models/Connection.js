import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const Connections = sq.define('connection', {
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    connections: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    }
})

User.sync().then(() => {
    console.log('User model synced');
}). catch(err => {
    console.error('Unable to sync model: ', err);
});

export default Connections;