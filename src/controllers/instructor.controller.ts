import { Request, Response } from 'express'
import * as instructorService from '../services/instructor.service'
import { returnNotFound, returnServerError } from '../utils/errorHandler'
import { AuthRequest } from '../middleware/auth'

export const getAllInstructors = async (_req: Request, res: Response) => {
  try {
    const instructors = await instructorService.getAllInstructors()
    res.json(instructors)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
}

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructor = await instructorService.getInstructorById(req.params.id)
    if (!instructor) {
      returnNotFound(res, 'Instructor not found')
      return
    }
    res.json(instructor)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
}

export const updateInstructorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id // Get user ID from the authenticated token
    const updatedProfile = await instructorService.updateInstructorProfile(
      userId,
      req.body
    )
    res.json(updatedProfile)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
} 