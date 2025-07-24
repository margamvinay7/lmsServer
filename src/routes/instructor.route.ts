import express from 'express'
import * as instructorController from '../controllers/instructor.controller'
import { authenticate, authorize } from '../middleware/auth'
import { Role } from '@prisma/client'

const router = express.Router()

// @route   GET /api/instructors
// @desc    Get all instructors (for admin use)
// @access  Private (Admin)
router.get('/', authenticate, authorize(Role.ADMIN), instructorController.getAllInstructors)

// @route   GET /api/instructors/:id
// @desc    Get a single instructor's public profile
// @access  Public
router.get('/:id', instructorController.getInstructorById)

// @route   PUT /api/instructors/profile
// @desc    Update the logged-in instructor's own profile
// @access  Private (Instructor)
router.put(
  '/profile',
  authenticate,
  authorize(Role.INSTRUCTOR),
  instructorController.updateInstructorProfile
)

export default router 