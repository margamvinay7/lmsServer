import { Router } from 'express'
import * as enrollmentController from '../controllers/enrollment.controller'
import { validate } from '../middleware/validate'
import { CreateEnrollmentSchema } from '../validators/enrollment.schema'
import { requireStudent } from '../middleware/validate' 

const router = Router()

router.post('/', validate(CreateEnrollmentSchema), requireStudent, enrollmentController.createEnrollment)
router.get('/', enrollmentController.getAllEnrollments)
router.get('/:id', enrollmentController.getEnrollmentById)

export default router
