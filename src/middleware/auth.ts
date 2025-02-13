import { appEnv } from '../utils/constant';

const jwt = require('jsonwebtoken');

export const auth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, appEnv.salt);
    req.userId = decoded.userId; // Attach user ID to the request object
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
