const ErrorResponse = require('../common/errorResponse');

const errorHandle = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (process.env.NODE_ENV === 'development') {
        // Log error on dev
        console.log(err.stack);

        // MongoDB bad ObjectID
        if (err.name === 'CastError') {
            error = new ErrorResponse(err.message, 404);
        }

        //MongoDB duplicate value key
        if (err.code === 11000) {
            error = new ErrorResponse(err.message, 400);
        }

        // MongoDB validation failed
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map((value) => value.message)
                .join(', ');
            error = new ErrorResponse(message, 400);
        }

        // Error jwt validation
        if (err.name === 'JsonWebTokenError') {
            error = new ErrorResponse(err.message, 401);
        }

        // Error jwt expired
        if (err.name === 'TokenExpiredError') {
            error = new ErrorResponse(err.message, 401);
        }
    } else {
        // MongoDB bad ObjectID
        if (err.name === 'CastError') {
            error = new ErrorResponse('Not found ID', 404);
        }
    }

    res.status(error.statusCode || 500).json({
        msg: error.message || 'Server Error',
    });
};

module.exports = errorHandle;
