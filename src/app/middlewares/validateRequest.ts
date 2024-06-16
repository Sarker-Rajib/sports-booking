import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const inputDataValidator = (validator: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validator.parseAsync(req.body);

    next();
  });
};

export default inputDataValidator;
