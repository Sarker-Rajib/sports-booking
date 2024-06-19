"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = exports.handleCastError = exports.handleValidationError = exports.handleZodError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
const handleZodError = (err) => {
    const ierr = err.issues;
    let errorSources = [];
    let message = "";
    for (let i = 0; i < ierr.length; i++) {
        const srr = {
            path: ierr[i].path[ierr[i].path.length - 1],
            message: ierr[i].message,
        };
        errorSources.push(srr);
        message = message + " " + ierr[i].message;
    }
    return {
        message: `Zod Error : ${message}`,
        errorSources,
    };
};
exports.handleZodError = handleZodError;
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        message: "Validation Error",
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        message: err.message,
        errorSources,
    };
};
exports.handleCastError = handleCastError;
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const errorSources = [
        {
            path: "",
            message: match === null || match === void 0 ? void 0 : match.input,
        },
    ];
    return {
        message: match === null || match === void 0 ? void 0 : match.input,
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
