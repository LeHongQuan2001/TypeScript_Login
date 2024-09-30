import { Request, Response } from "express";
import { listLanguages } from "../services/siteServices";
import { ok } from "../utils/responseUtils";

export const getLanguages = async (req: Request, res: Response): Promise<void> => {
    const languages = await listLanguages();
    ok(res, languages);
};
