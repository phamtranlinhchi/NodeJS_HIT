const asyncHandle = require('../middlewares/asyncHandle');

module.exports.index = asyncHandle(async (req, res, next) => {
    res.render('main');
});
