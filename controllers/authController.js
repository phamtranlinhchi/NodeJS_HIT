const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const asyncHandle = require('../middlewares/authMiddleware');

module.exports.login = asyncHandle(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        res.send('nguoi dung k ton tai');
    }

    if (!(await user.isPasswordMatch(password))) {
        return res.send('tai khoan hoac mat khau sai');
    }

    const token = jwt.sign({ username }, 'hey', { expiresIn: '1h' });

    res.status(200).json({ token });
});
