import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import myConfig from "../myConfig";
import {
  AppError,
  handleCastError,
  handleDuplicateError,
  handleValidationError,
  handleZodError,
} from "./ErrorHandlers";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = "Something went wrong!";
  let errorMessages;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorMessages = simplifiedError.errorSources;
    message = simplifiedError?.message;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    errorMessages = simplifiedError.errorSources;
    message = simplifiedError?.message;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    errorMessages = simplifiedError.errorSources;
    message = simplifiedError?.message;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    errorMessages = simplifiedError.errorSources;
    message = simplifiedError?.message;
  } else if (err instanceof AppError) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(400).json({
    success: false,
    message,
    errorMessages,
    stack: myConfig.NODE_ENV == "dev" ? err?.stack : null,
  });
};

export default globalErrorHandler;
