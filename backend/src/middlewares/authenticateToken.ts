import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { unauthorized } from "../utils/responseUtils";
import config from "../configs";

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
      JWT.verify(token, config.jwt.secret, (error, decoded) => {
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
