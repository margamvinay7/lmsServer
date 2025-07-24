import { Request, Response } from 'express';
import { CreateChapterSchema } from '../validators/chapter.schema';
import { createChapterService } from '../services/chapter.service';
import videoQueue from '../utils/queue';

export const createChapter = async (req: Request, res: Response):Promise<void> => {
  try {
    const { title, position, courseId } = req.body;
    const videoFile = req.file;

    // Validate input
    const parsed = CreateChapterSchema.safeParse({
      title,
      position: Number(position),
      courseId,
    });
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return 
    }

    // Save chapter to DB (include videoUrl if you want)
    const chapter = await createChapterService({
      ...parsed.data,
      videoUrl: videoFile ? `/uploads/${videoFile.filename}` : undefined,
    });

    // Queue video processing
    if (videoFile) {
      await videoQueue.add('video-processing', {
        chapterId: chapter.id,
        videoPath: videoFile.path,
        originalName: videoFile.originalname,
        outputPath: `./uploads/courses/${chapter.id}`,
      });
      console.log("queue",videoQueue)
    }

    res.status(201).json({ chapter });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 