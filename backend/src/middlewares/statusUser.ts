import { Request, Response, NextFunction } from "express";
import jwtConfig from "../configs/jwt";
import JWT from "jsonwebtoken";
import { unauthorized } from "../utils/responseUtils";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const statusUser = async (
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
    console.log('user111111111', user);

    req.user = user;
    const profileUser = await User.findOne({ where: { id: user.userId } });
    if(profileUser?.status === 'inactive') {
      res.status(403).json({ message: 'User is inactive' });
      return;
    }
    next();
  } catch (error) {
    unauthorized(res);
    return;
  }
};

export default statusUser;
