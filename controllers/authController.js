const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandle = require('../middlewares/asyncHandle');
const ErrorResponse = require('../common/ErrorResponse');

module.exports.login = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return next(new ErrorResponse('Not found user', 401));
    }

    if (!user.isPasswordMatch(password)) {
        return next(new ErrorResponse('Invalid password', 401));
    }

    const token = jwt.sign({ username }, process.env.PRIVATE_KEY, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
});

// module.exports.forgetPassword = asyncHandle(async (req, res, next) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email })

// }
