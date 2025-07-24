import express from 'express'
import * as userController from '../controllers/user.controller'
import { authenticate, authorize } from '../middleware/auth'
import { Role } from '@prisma/client'

const router = express.Router()

// @route   POST /api/users
// @desc    Create a new user (student, instructor, or admin)
// @access  Private (Admin)
router.post(
  '/',
  authenticate,
  authorize(Role.ADMIN),
  userController.createNewUser
)

export default router
