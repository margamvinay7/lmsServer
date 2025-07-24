import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { returnUnauthorized,returnForbidden } from '../utils/errorHandler'
import { Role } from '@prisma/client'

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: Role
  }
}

// Auth middleware (adds `req.user`)
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  let token = req.headers.authorization?.split(' ')[1];
  // If not in header, check cookies
  if (!token && req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  console.log("token",token)
  if (!token) {
    returnUnauthorized(res);
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! || 'secret') as {
      id: string;
      role: Role;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Role-based guard middleware
export const authorize =
  (...roles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
        returnUnauthorized(res)
      return
    }

    if (!roles.includes(req.user.role)) {
        returnForbidden(res, 'You do not have access to this resource')
      return
    }

    next()
  }
