"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const myConfig_1 = __importDefault(require("../myConfig"));
const ErrorHandlers_1 = require("./ErrorHandlers");
const globalErrorHandler = (err, req, res, next) => {
    let message = "Something went wrong!";
    let errorMessages;
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, ErrorHandlers_1.handleZodError)(err);
        errorMessages = simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, ErrorHandlers_1.handleValidationError)(err);
        errorMessages = simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, ErrorHandlers_1.handleCastError)(err);
        errorMessages = simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, ErrorHandlers_1.handleDuplicateError)(err);
        errorMessages = simplifiedError.errorSources;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    else if (err instanceof ErrorHandlers_1.AppError) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(400).json({
        success: false,
        message,
        errorMessages,
        stack: myConfig_1.default.NODE_ENV == "dev" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
