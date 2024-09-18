import { Request, Response } from "express";
// import { list, createInfoRole, updateInfoRole, deleteInfoRole } from "../services/roleService";
import { list, getRoleId, createInfoRole, updateInfoRole, deleteInfoRole } from "../services/roleService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, search } = req.query as { page?: string; limit?: string; search?: string };
    const Roles = await list(page, limit, search);
    ok(res, Roles);
};

export const getRole = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query as { id: string };
    const user = await getRoleId(id);
    ok(res, user);
  };

export const createRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const result = await createInfoRole(data);
      ok(res, result);   
    } catch (error) {
        console.log(error)
    }
};

export const updateRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params as unknown as { id: number };
      const data = req.body;
    const result = await updateInfoRole(id, data);
    ok(res, result);   
    } catch (error) {
        console.log(error)
    }
}; 

export const deleteRole = async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.body;
    await deleteInfoRole(ids);
    ok(res, {
        message: "Roles deleted successfully",
      });
}