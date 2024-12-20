const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    //Wrong MongoDB Id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    //mongoose duplicate key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong jwt Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json wab token is invalid, Try again`;
        err = new ErrorHandler(message, 400)
    }

    //JWT Expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json wab token is Expired, Try again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
};