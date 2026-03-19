import { Response } from "express";

// Generic API response type
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  timestamp: string;
}

// Generic function
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "error",
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};