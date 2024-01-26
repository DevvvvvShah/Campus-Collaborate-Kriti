import { sq } from '../config/db';
import { DataTypes } from 'sequelize';

const skills = sq.define('skills',{
    skillId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,                                //Maybe needed or may not, check once
    },
    skillName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.BLOB(10 * 1024 * 1024),
        allowNull: false,
    },
});

skills.sync().then(() => {
    console.log('skills model synced');
}). catch(err => {
    console.error('Unable to sync model skills: ', err);
});

export default skills;