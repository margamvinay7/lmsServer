import express from 'express'
import * as authController from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.get('/me', authenticate, authController.getMe)

export default router