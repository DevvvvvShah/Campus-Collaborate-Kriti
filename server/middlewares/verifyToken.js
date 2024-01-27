const jwt = require('jsonwebtoken');
const User = require('../models/User');
const USER = require('../auth/auth');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        console.log(bearerToken);
        next();
    } else{
        res.status(403).json('Invalid token!');
    }
}

const authenticateUser = async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SEC, async (err, authData) => {
        console.log(authData);
        if(err){
            console.log("err:", err);
            res.status(403).json('Authentication failed!');
        } else{
            if(!authData.isowner){
                res.status(403).json('Not admin!');
            } else{
                const user = await User.findById(authData.id);
                if(!user){
                    res.status(403).json('No such user exists!');
                } else{
                    req.user = authData.id;
                    next();
                }
            }
        }
    })
}

const authorizeUser = (req, res, next) => {
    if(req.user === req.params.userid){
        next();
    } else{
        res.sendStatus(400);
    }
}

module.exports = {
    verifyToken,
    authenticateUser,
    authorizeUser,
}