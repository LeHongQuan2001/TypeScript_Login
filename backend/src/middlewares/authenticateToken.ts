import { Request, Response, NextFunction } from "express";
import jwtConfig from "../configs/jwt";
import JWT from "jsonwebtoken";
import { unauthorized } from "../utils/responseUtils";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    unauthorized(res);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await new Promise<any>((resolve, reject) => {
      JWT.verify(token, '8016af4e64e81ae37679660bdc1de8a028c0edf7bdb234d7d31ff3ac14a3c589', (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });

    req.user = user;
    next();
  } catch (error) {
    unauthorized(res);
    return;
  }
};

export default authenticateToken;
