import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  res.status(responseData?.statusCode).json({
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
  });
};

export default sendResponse;
