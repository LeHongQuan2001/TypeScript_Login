import { Request, Response } from "express";
import { list, createInfoLanguage, updateInfoLanguage, deleteInfoLanguage } from "../services/languageService";
import { ok } from "../utils/responseUtils";

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

const attachFlagUrl = (file: Express.Multer.File | undefined) => {
    return file && file.filename ? `${baseUrl}/${file.filename}` : undefined;
};

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, search } = req.query as { page?: string; limit?: string; search?: string };
        const languages = await list(page, limit, search);
        ok(res, languages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
};

export const createLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const language = req.body;
        const flagUrl = attachFlagUrl(req.file);
        if (flagUrl) {
            language.flag = flagUrl;
        }
        const result = await createInfoLanguage(language);
        ok(res, result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create language' });
    }
};

export const updateLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const language = req.body;
        const flagUrl = attachFlagUrl(req.file);
        if (flagUrl) {
            language.flag = flagUrl;
        }
        const result = await updateInfoLanguage(id, language);
        ok(res, result);
    } catch (error) {
        res.status(500).json({ error: `Failed to update language` });
    }
};

export const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids } = req.body;
        await deleteInfoLanguage(ids);
        ok(res, { message: "Languages deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete languages' });
    }
};
