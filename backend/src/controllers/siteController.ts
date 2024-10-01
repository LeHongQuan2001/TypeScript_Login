import { Request, Response } from "express";
import { listLanguages, listPermissions } from "../services/siteServices";
import { ok } from "../utils/responseUtils";

export const getLanguages = async (req: Request, res: Response): Promise<void> => {
    const languages = await listLanguages();
    ok(res, languages);
};

export const getPermissions = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers["authorization"] as string;
    const permissions = await listPermissions(token);
    ok(res, permissions);
};
