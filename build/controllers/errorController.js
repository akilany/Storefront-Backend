"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var appError_1 = __importDefault(require("../utils/appError"));
var handleInvalidFieldsDB = function (err) {
    var message = "Invalid input value: ".concat(err, ". Please use correct value!");
    return new appError_1["default"](message, 400);
};
var handleUniqueFieldsDB = function (err) {
    var message = "Unique field value: ".concat(err.detail, ". Please use another value!");
    return new appError_1["default"](message, 400);
};
var handleInvalidReferencesDB = function (err) {
    var message = "Invalid key: ".concat(err.detail, ". Please use another key!");
    return new appError_1["default"](message, 400);
};
var handleJWTError = function () {
    return new appError_1["default"]('Invalid token. Please log in again!', 401);
};
var handleJWTExpiredError = function () {
    return new appError_1["default"]('Your token has expired! Please log in again.', 401);
};
var sendError = function (err, req, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports["default"] = (function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.ENV === 'dev') {
        var error = err;
        if (error.code === '23505')
            error = handleUniqueFieldsDB(error);
        if (error.code === '23502')
            error = handleInvalidFieldsDB(error);
        if (error.code === '23503')
            error = handleInvalidReferencesDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendError(error, req, res);
    }
});
