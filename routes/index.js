const ErrorResponse = require('../common/ErrorResponse');
const urlRouter = require('./urlRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const siteRouter = require('./siteRouter');

function route(app) {
    app.use('/users', userRouter);
    app.use('/urls', urlRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
    app.use('*', (req, res, next) => {
        return next(new ErrorResponse('Not found route', 404));
    });
}

module.exports = route;
