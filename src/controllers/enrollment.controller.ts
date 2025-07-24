import { Request, Response } from 'express'
import { ValidateRequest } from '../middleware/validate'
import * as enrollmentService from '../services/enrollment.service'
import { CreateEnrollmentInput } from '../validators/enrollment.schema'
import { returnServerError,returnNotFound } from '../utils/errorHandler'

export const createEnrollment = async (req: ValidateRequest, res: Response): Promise<void> => {
    try {
      const input = req.validated as CreateEnrollmentInput
      const enrollment = await enrollmentService.createEnrollment(input)
      res.status(201).json(enrollment)
    } catch (err) {
      returnServerError(res, err instanceof Error ? err.message : String(err))
    }
  }
  
  export const getAllEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page = '1', limit = '10', studentId, courseId } = req.query
      const enrollments = await enrollmentService.getAllEnrollments({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        studentId: studentId as string,
        courseId: courseId as string
      })
      res.json(enrollments)
    } catch (err) {
      returnServerError(res, err instanceof Error ? err.message : String(err))
    }
  }
  
  export const getEnrollmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const enrollment = await enrollmentService.getEnrollmentById(id)
      if (!enrollment) {
        // res.status(404).json({ message: 'Enrollment not found' })
        returnNotFound(res)
        return 
      }
      res.json(enrollment)
    } catch (err) {
      returnServerError(res, err instanceof Error ? err.message : String(err))
    }
  }


  
