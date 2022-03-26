const ErrorResponse = require('../common/errorResponse');

const errorHandle = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log error on dev
    console.log(err.stack);

    // MongoDB bad ObjectID
    if (err.name === 'CastError') {
        error = new ErrorResponse('Id không đúng định dạng', 404);
    }

    //MongoDB duplicate value key
    if (err.code === 11000) {
        error = new ErrorResponse('Dự liệu trùng', 400);
    }

    // MongoDB validation failed
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorResponse(message, 400);
    }

    // Error jwt validation
    if (err.name === 'JsonWebTokenError') {
        error = new ErrorResponse('Invalid token, Please log in again!', 401);
    }

    // Error jwt expired
    if (err.name === 'TokenExpiredError') {
        error = new ErrorResponse(
            'Your token has expired! please login again',
            401
        );
    }

    res.status(error.statusCode || 500).json({
        msg: error.message || 'Lỗi máy chủ',
    });
};

module.exports = errorHandle;
