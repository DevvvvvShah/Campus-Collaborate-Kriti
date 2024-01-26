import { sq } from '../config/db';
import { DataTypes } from 'sequelize';
const User = require('./User');

const Chats = sq.define('chats',{
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,        
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {                       // Foreign Key constraint
            model: User,
            key: 'email',
        }
    }, 
    to: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {                       //Should be a key in User table email key 
                                            //    (or) 
                                            //in Group Table in group id
                                            //Implementing both conditions is difficult might have to change the structure accordingly
                                            //For now only the email constraint is there
            model: User,
            key: 'email',
        }        
    },
    timeOfMessage: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    messageContent: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Chats.sync().then(() => {
    console.log('Chats model synced');
}). catch(err => {
    console.error('Unable to sync model Chats: ', err);
});

export default Chats;