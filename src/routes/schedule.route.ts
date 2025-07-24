import { Router } from 'express'
import * as scheduleController from '../controllers/schedule.controller'
import { validate } from '../middleware/validate'
import { CreateScheduleSchema, UpdateScheduleSchema } from '../validators/schedule.schema'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/', authenticate, validate(CreateScheduleSchema), scheduleController.createSchedule)
router.get('/', scheduleController.getAllSchedules)
router.get('/:id', scheduleController.getScheduleById)
router.put('/:id', validate(UpdateScheduleSchema), scheduleController.updateSchedule)
router.delete('/:id', scheduleController.deleteSchedule)
// router.get('/calendar', scheduleController.getCalendar)
export default router
