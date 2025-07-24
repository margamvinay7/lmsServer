import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { AuthRequest } from './auth'
import { returnForbidden } from '../utils/errorHandler'

export interface ValidateRequest extends Request {
    validated?:any|unknown
  }

export const validate = <T extends z.ZodTypeAny>(schema: T) =>
  (req: ValidateRequest, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        issues: result.error.errors,
      })
      return
    }

    req.validated = result.data
    next()
  }

  export const requireStudent = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as { role?: string }
    if (!user || user.role !== 'STUDENT') {
      // res.status(403).json({ message: 'Only students can perform this action' })
      returnForbidden(res,'Only students can perform this action')
      return 
    }
    next()
  }
