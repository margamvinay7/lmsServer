import { Router } from 'express';
import { createChapter } from '../controllers/chapter.controller';
import uploader from '../utils/uploader';

const router = Router();
router.post('/', uploader.single('video'), createChapter);
export default router; 