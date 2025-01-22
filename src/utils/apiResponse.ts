import { Response } from 'express';
import { ZodError } from 'zod';

// Standard response structure
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { path: (string | number)[]; message: string }[];
}

// Success response
export const sendSuccessResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

// Error response
export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: { path: (string | number)[]; message: string }[]
): void => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    errors,
  };
  res.status(statusCode).json(response);
};

// Validation error response (for Zod errors)
export const sendValidationErrorResponse = (
  res: Response,
  error: ZodError
): void => {
  const errors = error.errors.map((err) => ({
    path: err.path,
    message: err.message,
  }));
  sendErrorResponse(res, 'Validation failed', 400, errors);
};
