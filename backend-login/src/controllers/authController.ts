import { Request, Response } from 'express';
import { loginUser } from '../services/authServices';
import { ok, unauthorized } from '../utils/responseUtils';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        ok(res, user);
    } catch (error) {
        if (error instanceof Error) {
            unauthorized(res, error.message);
        } else {
            unauthorized(res, 'Invalid credentials');
        }
    }
};
