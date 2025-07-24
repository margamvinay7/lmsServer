import {prisma} from '../utils/prisma';
import { CreateChapterInput } from '../validators/chapter.schema';

export const createChapterService = async (data: CreateChapterInput & { videoUrl?: string }) => {
  return prisma.chapter.create({
    data: {
      title: data.title,
      position: data.position,
      courseId: data.courseId,
      videoUrl: data.videoUrl,
    },
  });
}; 