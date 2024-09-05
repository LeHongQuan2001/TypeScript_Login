import { Request, Response } from "express";
import { invalidated, ok, unauthorized } from "../utils/responseUtils";
import { list, getUserId, createNewUser, updateInfoUser, deleteInfoUser } from "../services/userServices";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, search, role, status } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
      role?: string;
      status?: string;
    };
    const result = await list(page, limit, search, role, status);
    ok(res, result);
  } catch (error) {
    if (error instanceof Error) {
      unauthorized(res, error.message || "Unauthorized access");
    } else {
      unauthorized(res, "Unknown error occurred");
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.query as { id: string };
  const user = await getUserId(id);
  ok(res, user);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {   
  try {
    const user = req.body;
    if (req.file && req.file.filename) {
      user.avatar = `http://localhost:5000/${req.file.filename}`;
    }
    const newUser = await createNewUser(user);
    ok(res, newUser);
  } catch (error) {
    if (error instanceof Error) {
      invalidated(res, error.message || "Unauthorized access");
    } else {
      invalidated(res, "Unknown error occurred");
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = req.body;
    if (req.file && req.file.filename) {
      user.avatar = `http://localhost:5000/${req.file.filename}`;
    }
    await updateInfoUser(userId, user);
    ok(res, { user: "Update successful" });
  } catch (error) {
    if (error instanceof Error) {
      invalidated(res, error.message || "Unauthorized access");
    } else {
      invalidated(res, "Unknown error occurred");
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { ids } = req.body;
  await deleteInfoUser(ids);
  ok(res, { Delete: "Successfull" });
};
