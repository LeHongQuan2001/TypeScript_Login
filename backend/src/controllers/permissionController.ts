import { Request, Response } from "express";
import { list, getIdPermission,  groupPermData, createInfoPermission, updateInfoPermission, deleteInfoPermission } from "../services/permissionService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search, role, status } = req.query as {
        page?: string; limit?: string; search?: string; role?: string; status?: string; };
      const Permissions = await list(page, limit, search, role, status);
    ok(res, Permissions);
};

export const getId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const Permissions = await getIdPermission(id);
    ok(res, Permissions);
}

export const groupPerm = async (req: Request, res: Response): Promise<void> => {
    const result = await groupPermData();
    ok(res, result);
};

export const createPerm = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const result = await createInfoPermission(data);
    ok(res, result);
}

export const updatePerm = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateInfoPermission(id, data);
    ok(res, result);
}

export const deletePerm = async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.body;
    await deleteInfoPermission(ids);
    ok(res, {
        message: "Permissions deleted successfully",
      });
}