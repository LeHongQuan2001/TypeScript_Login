import { Request, Response } from 'express';
import { loginUser, deleteOtpService, forgotPwService, verifyEmailService, newPasswordService, sendMailService } from '../services/authServices';
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

export const deleteOtp = async (req: Request, res: Response): Promise<void> => {
    const result = await deleteOtpService(req.body.otp);
    ok(res, result);
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await forgotPwService(req.body.email);
        ok(res, result);
    } catch (error) {
        if (error instanceof Error) {
            unauthorized(res, error.message);
        } else {
            unauthorized(res, 'Invalid credentials');
        }
    }
};

export const sendMail = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await sendMailService(req.body);
        ok(res, result);
    } catch (error) {
        if (error instanceof Error) {
            unauthorized(res, error.message);
        } else {
            unauthorized(res, 'Invalid credentials');
        }
    }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    const { otp } = req.body;
    const result = await verifyEmailService(otp);
    ok(res, result);
};

export const newPassword = async (req: Request, res: Response): Promise<void> => {
    const result = await newPasswordService(req.body);
    ok(res, result);
};
