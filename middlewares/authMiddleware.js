const asyncHandle = require('./asyncHandle');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../common/ErrorResponse');

module.exports.admin = asyncHandle(async (req, res, next) => {
    const { id } = req.query;
    const user = User.findById(id);
    if (user && user.role === 'admin') {
        next();
    } else {
        res.send('Login first');
    }
});

module.exports.protect = asyncHandle(async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
            if (err) next(new ErrorResponse('Invalid token'), 401);
            else next();
        });
    } else {
        res.send('Not found token. Need to sign in');
    }
});
