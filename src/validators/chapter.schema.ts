import { z } from 'zod';

export const CreateChapterSchema = z.object({
  title: z.string().min(1),
  position: z.number(),
  courseId: z.string().min(1),
});

export type CreateChapterInput = z.infer<typeof CreateChapterSchema>; 