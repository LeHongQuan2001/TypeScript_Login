// src/middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../types/express';
import config from '../configs';

export const authenticateJWT = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Lấy JWT từ header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as any; // Giải mã token

        req.user = {
            userId: decoded.userId,
            permissions: '', // Lấy danh sách tên của permissions
            role: decoded.role, // Giả định user có thuộc tính role
            iat: decoded.iat,
            exp: decoded.exp
        };

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
