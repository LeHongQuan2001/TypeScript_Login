import { Request, Response } from "express";
import { list } from "../services/languageService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search } = req.query as { page?: string; limit?: string; search?: string };
    const languages = await list(page, limit, search);
    ok(res, languages);
};