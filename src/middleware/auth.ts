import { sendErrorResponse } from '../utils/apiResponse';
import { appEnv } from '../utils/constant';
import { JwtPayload, verify } from 'jsonwebtoken';

export const auth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return sendErrorResponse(res, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = verify(token, appEnv.salt);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    sendErrorResponse(res, 'Invalid token.', 401);
  }
};
