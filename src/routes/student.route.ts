import express from 'express'
import * as studentController from '../controllers/student.controller'
import { authenticate, authorize } from '../middleware/auth'
import { Role } from '@prisma/client'

const router = express.Router()

// @route   GET /api/students
// @desc    Get all students (for admin dashboard)
// @access  Private (Admin)
router.get(
  '/',
  authenticate,
  authorize(Role.ADMIN),
  studentController.getAllStudents
)

// @route   GET /api/students/profile
// @desc    Get the logged-in student's own profile
// @access  Private (Student)
router.get(
  '/profile',
  authenticate,
  authorize(Role.STUDENT),
  studentController.getStudentProfile
)

// @route   PUT /api/students/profile
// @desc    Update the logged-in student's own profile
// @access  Private (Student)
router.put(
  '/profile',
  authenticate,
  authorize(Role.STUDENT),
  studentController.updateStudentProfile
)

export default router 