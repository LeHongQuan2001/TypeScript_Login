import { Request, Response } from 'express';
import { ok, unauthorized } from '../utils/responseUtils';
import { list, getUserId, createNewUser } from '../services/userServices';

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, search } = req.query as { page?: string; limit?: string; search?: string };
        const result = await list(page, limit, search);
        ok(res, result);
    } catch (error) {
        if (error instanceof Error) {
            unauthorized(res, error.message || 'Unauthorized access');
        } else {
            unauthorized(res, 'Unknown error occurred');
        }
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query as { id: string };
    const user = await getUserId(id);
    ok(res, user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    console.log('user', user.file);
    if (req.file && req.file.filename)
        user.avatar = `http://localhost:5000/${req.file.filename}`;
    const newUser = await createNewUser(user);
    ok(res, newUser);
};

