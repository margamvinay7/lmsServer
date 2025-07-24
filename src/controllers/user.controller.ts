import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { returnServerError } from '../utils/errorHandler'
import { CreateUserInput } from '../validators/user.schema'

/**
 * Controller for an admin to create a new user (student, instructor, or another admin).
 * The request body should contain the user's details and their role.
 */
export const createNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body as CreateUserInput)
    res.status(201).json(newUser)
  } catch (error: any) {
    // Handle cases like duplicate email from Prisma
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      res.status(409).json({ message: 'A user with this email already exists.' })
      return
    }
    returnServerError(res, error.message)
  }
}
