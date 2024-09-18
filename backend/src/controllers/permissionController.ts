import { Request, Response } from "express";
import { list, getIdPerm,  groupPermData, createInfoPerm, updateInfoPerm, deleteInfoPerm } from "../services/permissionService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, role, status } = req.query as {
        page?: string;
        limit?: string;
        search?: string;
        role?: string;
        status?: string;
      };
      const Permissions = await list(page, limit, search, role, status);
    ok(res, Permissions);
};

export const getId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const Permissions = await getIdPerm(id);
    ok(res, Permissions);
}

export const groupPerm = async (req: Request, res: Response): Promise<void> => {
    const result = await groupPermData();
    ok(res, result);
};

export const createPerm = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const result = await createInfoPerm(data);
    ok(res, result);
}

export const updatePerm = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateInfoPerm(id, data);
    ok(res, result);
}

export const deletePerm = async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.body;
    await deleteInfoPerm(ids);
    ok(res, {
        message: "Permissions deleted successfully",
      });
}