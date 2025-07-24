import { z } from 'zod'

export const CreateChapterSchema = z.object({
  title: z.string().min(1, 'Chapter title is required'),
  position: z.number().int().min(1, 'Position must be at least 1'),
  // videoFile is validated in controller as file, so here just require a string (filename) or allow null for validation
  videoFile: z.any().optional(), // Accepts file or undefined/null, actual file validation is in controller
});

// export const CreateCourseSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   price: z.preprocess((val) => (typeof val === 'string' ? parseFloat(val) : val), z.number().nonnegative('Price must be non-negative')),
//   instructorId: z.string().min(1, 'Instructor ID is required'),
//   categories: z.array(z.string()),
//   isPublished: z.boolean().optional(),
//   imageUrl: z.string().optional(),
//   chapters: z.array(CreateChapterSchema).min(1, 'At least one chapter is required'),
// });

export const CreateCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1), // If numeric, use z.coerce.number()
  instructorId: z.string().min(1),
  categories: z.array(z.string()),
  isPublished: z.boolean(),
  imageUrl: z.string().optional(),
  // chapters removed from course creation
});

export const UpdateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
export type CreateChapterInput = z.infer<typeof CreateChapterSchema>;