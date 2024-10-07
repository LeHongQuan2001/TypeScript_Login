import { Response } from 'express';

interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
  data?: any;
}

interface SuccessResponse {
  success: boolean;
  data: any;
  status: number;
  message: string;
}

export const ok = (res: Response, data: any): Response<SuccessResponse> => {
  return res.status(200).send({
    success: true,
    data,
    status: 200,
    message: "Successful",
  });
};

export const notFound = (res: Response): Response<ErrorResponse> => {
  return res.status(404).send({
    success: false,
    status: 404,
    message: "Cannot find resources",
  });
};

export const error = (res: Response, message?: string): Response<ErrorResponse> => {
  return res.status(500).send({
    success: false,
    status: 500,
    message: message || "Internal server error",
  });
};

export const unauthorized = (res: Response, message?: string): Response<ErrorResponse> => {
  return res.status(401).send({
    success: false,
    status: 401,
    message: message || "Unauthorized",
  });
};

export const invalidated = (res: Response, errors: any): Response<ErrorResponse> => {
  return res.status(422).send({
    success: false,
    status: 422,
    data: errors,
  });
};

export const userError = (res: Response, error: string): Response<ErrorResponse> => {
  return res.status(404).send({
    success: false,
    status: 404,
    message: error,
  });
};

export const Failed = (res: Response, error: string): Response<ErrorResponse> => {
  return res.status(409).send({
    success: false,
    status: 409,
    message: error,
  });
};
