const asyncHandle = require('./asyncHandle');
const User = require('../../nodejs/models/userModel');
const jwt = require('jsonwebtoken');

module.exports.admin = asyncHandle(async (req, res, next) => {
    const { id } = req.query;
    const user = User.findById(id);
    if (user && user.userType === 'admin') {
        next();
    } else {
        res.send('Error');
    }
});

module.exports.protect = asyncHandle(async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
            if (err) res.send('Invalid token');
            next();
        });
    } else {
        res.send('Not found token. Need to sign in');
    }
});
