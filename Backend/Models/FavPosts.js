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
        type: DataTypes.NUMBER,
        allowNull: false,    
        refernces: {                                                        //Foreign Key
            model: Posts,
            key: 'postsId',
        },
        //TODO: Check if each element exists in post table
    },
});

User.belongsToMany(Posts, {through: FavPosts});
Posts.belongsToMany(User, {through: FavPosts});

FavPosts.sync().then(() => {
    console.log('FavPosts model synced');
}). catch(err => {
    console.error('Unable to sync model Favposts: ', err);
});

export default FavPosts;