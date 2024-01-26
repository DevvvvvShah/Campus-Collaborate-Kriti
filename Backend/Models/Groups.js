import { sq } from '../config/db';
import { DataTypes } from 'sequelize';
const User = require('./User');

const Groups = sq.define('groups', {
    groupId: {
        type: DataTypes.NUMBER,
        allowNull:false,
        autoIncrement: true,
    },
    members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        //TODO: Check if each element exists in post table    
    },
    admins: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        //TODO: Check if each element exists in post table 
    },
    thumbnail: {
        type: DataTypes.BLOB(10 * 1024 * 1024),
        allowNull: false,
    },    
})

Groups.sync().then(() => {
    console.log('Groups model synced');
}). catch(err => {
    console.error('Unable to sync model Groups: ', err);
});

export default Groups;