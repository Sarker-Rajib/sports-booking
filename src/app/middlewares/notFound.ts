import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found"
  });
};
