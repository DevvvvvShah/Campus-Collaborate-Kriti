const jwt = require('jsonwebtoken');
const Owner = require('../models/User');
const USER = require('../auth/auth');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split('.')[1];
        req.token = bearerToken;
        next();
    } else{
        res.status(403).json('Invalid token!');
    }
}

const authenticateUser = async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SEC, async (err, authData) => {
        if(err){
            res.status(403).json('Authentication failed!');
        } else{
            if(!authData.isowner){
                res.status(403).json('Unauthenticated user!');
            } else{
                const user = await User.findById(authData.id);
                if(!user){
                    res.status(403).json('Not auth user!');
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