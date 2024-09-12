import { Request, Response } from "express";
import { list } from "../services/permissionService";
import { ok } from "../utils/responseUtils";

export const index = async (req: Request, res: Response): Promise<void> => {
    const Permissions = await list();
    ok(res, Permissions);
};

// export const createRole = async (req: Request, res: Response): Promise<void> => {
//     const Role = req.body;
//     const result = await createInfoRole(Role);
//     ok(res, result);            
// };

// export const updateRole = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     const Role = req.body;
//     const result = await updateInfoRole(id, Role);
//     ok(res, result);
// };

// export const deleteRole = async (req: Request, res: Response): Promise<void> => {
//     const { ids } = req.body;
//     await deleteInfoRole(ids);
//     ok(res, {
//         message: "Roles deleted successfully",
//       });
// }