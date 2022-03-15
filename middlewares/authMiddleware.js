const asyncHandle = require('../middlewares/asyncHandle');
const User = require('../models/userModel');

module.exports.admin = asyncHandle((req, res, next) => {
    const { id } = req.query;
    const user = User.findById(id);
    if (user && user.userType === 'admin') {
        next();
    }
    res.send('Error');
});
