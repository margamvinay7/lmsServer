import { Response } from 'express'
import * as studentService from '../services/student.service'
import { returnNotFound, returnServerError } from '../utils/errorHandler'
import { AuthRequest } from '../middleware/auth'

export const getAllStudents = async (_req: AuthRequest, res: Response) => {
  try {
    const students = await studentService.getAllStudents()
    res.json(students)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
}

export const getStudentProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const profile = await studentService.getStudentProfile(userId)
    if (!profile) {
      returnNotFound(res, 'Student profile not found')
      return
    }
    res.json(profile)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
}

export const updateStudentProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const updatedProfile = await studentService.updateStudentProfile(
      userId,
      req.body
    )
    res.json(updatedProfile)
  } catch (error: any) {
    returnServerError(res, error.message)
  }
} 