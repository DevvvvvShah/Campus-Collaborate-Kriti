import { sq } from '../config/db';
import { DataTypes } from 'sequelize';
const Posts = require('./posts');
const User = require('./User');

const FavPosts = sq.define('favPosts',{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        refernces: {                                                        //Foreign Key
            model: User,
            key: 'email',
        },        
    },
    postsId: {
        type: DataTypes.ARRAY(DataTypes.NUMBER),
        allowNull: false,
        validate: {
            notNull: {                                                      //Not null for elements inside the array
                args: true,
                msg: 'Each element in the posts array must not be null.',
            },
        },
        //TODO: Check if each element exists in post table
    },
});

FavPosts.sync().then(() => {
    console.log('FavPosts model synced');
}). catch(err => {
    console.error('Unable to sync model Favposts: ', err);
});

export default FavPosts;