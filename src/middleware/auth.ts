import { appEnv } from '../utils/constant';
import { JwtPayload, verify } from 'jsonwebtoken';

export const auth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = verify(token, appEnv.salt);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};
