const asyncHandle = require('../middlewares/asyncHandle');
const User = require('../models/userModel');
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
        req.headers.authorization.startsWith('Bearer ')
    ) {
        const token = req.headers.authorization('Bearer ')[1];
        console.log(jwt.verify(token, 'hey'));
    } else {
        res.send('khong co token');
    }
});
