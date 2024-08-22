import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const responseUtils = require('utils/responseUtils');

export const protect = (req: Request, res: Response, next: NextFunction): void => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded;
            next();
        } catch (error) {
            return responseUtils.unauthorized(res, 'Not authorized, token failed');
        }
    } else {
        return responseUtils.unauthorized(res, 'Not authorized, no token');
    }
};
