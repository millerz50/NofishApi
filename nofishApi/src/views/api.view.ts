import { Response } from 'express';

export const sendView = (res: Response, code: number, message: string, data: any = null) => {
  res.status(code).json({
    success: code < 400,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};