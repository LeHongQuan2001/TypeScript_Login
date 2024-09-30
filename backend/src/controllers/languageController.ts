import { Request, Response } from "express";
import { list, createInfoLanguage, updateInfoLanguage, deleteInfoLanguage, listLanguages } from "../services/languageService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search } = req.query as { page?: string; limit?: string; search?: string };
    const languages = await list(page, limit, search);
    ok(res, languages);
};

export const getLanguages = async (req: Request, res: Response): Promise<void> => {
    const languages = await listLanguages();
    ok(res, languages);
};

export const createLanguage = async (req: Request, res: Response): Promise<void> => {
    const language = req.body;

    if (req.file && req.file.filename) {
        language.flag = `http://localhost:5000/${req.file.filename}`;
    }
    const result = await createInfoLanguage(language);
    ok(res, result);            
};

export const updateLanguage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const language = req.body;
    if (req.file && req.file.filename) {
        language.flag = `http://localhost:5000/${req.file.filename}`;
    }
    const result = await updateInfoLanguage(id, language);
    ok(res, result);
};

export const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.body;
    await deleteInfoLanguage(ids);
    ok(res, {
        message: "Languages deleted successfully",
      });
}