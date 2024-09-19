import { Request, Response } from "express";
import { ok } from "../utils/responseUtils";
import { list, getFullList } from "../services/apiEndpointServices";

export const index = async (req: Request, res: Response): Promise<void> => {
    const apiEndpoints = await list();
    ok(res, apiEndpoints);
}

export const getLists = async (req: Request, res: Response): Promise<void> => {
    const apiEndpoints = await getFullList();
    ok(res, apiEndpoints);
}
