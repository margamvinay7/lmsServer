import { Router } from 'express';
import { createCourse, getAllCourses, getCourseById } from '../controllers/course.controller';
import { authenticate, authorize } from '../middleware/auth';
import uploader from '../utils/uploader';

const router = Router();


// router.post(
//   '/',
//   authenticate,
//   authorize('ADMIN', 'INSTRUCTOR'),
//   upload.any(),
// createCourse
// );
router.post('/',uploader.any(),createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;