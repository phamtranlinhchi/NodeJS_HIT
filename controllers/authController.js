const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandle = require('../middlewares/asyncHandle');
const bcrypt = require('bcrypt');

module.exports.login = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        res.send('Not found user');
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.send('Invalid password or username');
    }

    const token = jwt.sign({ username }, process.env.PRIVATE_KEY, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
});
