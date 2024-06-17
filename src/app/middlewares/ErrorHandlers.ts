import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "./error.const";
import mongoose from "mongoose";

export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const ierr = err.issues;

  let errorSources: TErrorSources = [];
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

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  return {
    message: "Validation Error",
    errorSources,
  };
};

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
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

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const errorSources: TErrorSources = [
    {
      path: "",
      message: match?.input,
    },
  ];

  return {
    message: match?.input,
    errorSources,
  };
};
