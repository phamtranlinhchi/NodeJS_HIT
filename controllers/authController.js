const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandle = require('../middlewares/asyncHandle');
const ErrorResponse = require('../common/ErrorResponse');

// [POST] /auth/login
module.exports.login = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return next(new ErrorResponse('Not found user', 401));
    }
    if (!(await user.isPasswordMatch(password))) {
        return next(new ErrorResponse('Invalid password', 401));
    }

    const token = jwt.sign({ username }, process.env.PRIVATE_KEY, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
});

// [POST] auth/forget-password
module.exports.forgetPassword = asyncHandle(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorResponse('Not found email', 401));
    await user.createResetPasswordToken();
    return res.status(200).json({
        url: `${process.env.HOST}/change-password?tk=${user.reset_password_token}`,
    });
});

// [PUT] auth/change-password?tk=...
module.exports.changePassword = asyncHandle(async (req, res, next) => {
    const token = req.query.tk;

    const user = await User.findOne({ reset_password_token: token });
    if (!user) return next(new ErrorResponse('Invalid token', 401));

    if (Date.now() > user.reset_password_token_expired)
        return next(new ErrorResponse('Expired token', 401));

    const { newPassword } = req.body;
    await User.findByIdAndUpdate(user._id, { password: newPassword });
    res.status(200).send('Change password successfully');
});

// [GET] auth/change-password?tk=....
module.exports.changePasswordSite = asyncHandle(async (req, res, next) => {
    const token = req.query.tk;
    res.render('change-password', { token });
});
